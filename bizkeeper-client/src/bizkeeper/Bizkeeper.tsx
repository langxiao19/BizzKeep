import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Alert,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Mic,
  MicOff,
  CheckCircle,
} from '@mui/icons-material';
import { WinBackCustomersDialog } from './messenger/WinBackDialog';
import { MenuItemEditConfirmDialog } from './publisher/MenuItemEditConfirmDialog';
import { updateMenuItemWithIntent } from '../workplace/website/menu/menuService';

// VOICE RECOGNITION: LISTENS AND SENDS SPEECH TO BACKEND STT API
let mediaRecorder: MediaRecorder | null = null;
let stream: MediaStream | null = null;

const BizkeeperPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [smsResult, setSmsResult] = useState<{
    sent: boolean;
    message?: string;
    error?: string;
    intent?: string;
  } | null>(null);
  const [smsStatus, setSmsStatus] = useState<{
    sent: boolean;
    error?: string;
  } | null>(null);
  const [detectedIntent, setDetectedIntent] = useState<{
    intent: string;
    message: string;
    confidence: string;
  } | null>(null);
  const [winBackDialog, setWinBackDialog] = useState({
    open: false,
    message: ""
  });

  const [processModal, setProcessModal] = useState({
    open: false,
    intent: "",
    targetAgent: "",
    message: "",
    processing: false
  });


  const [menuEditConfirmDialog, setMenuEditConfirmDialog] = useState({
    open: false,
    menuIntent: null as any,
    loading: false
  });



  // Function to determine target agent and show process modal
  const showProcessModal = (intent: string, message: string) => {
    setProcessModal({
      open: true,
      intent: intent,
      targetAgent: "Bizkeeper",
      message: message,
      processing: true
    });

    // Simulate processing time
    setTimeout(() => {
      setProcessModal(prev => ({ ...prev, processing: false }));
    }, 2000);
  };

  const handleCloseMenuEditConfirmDialog = () => {
    setMenuEditConfirmDialog({ 
      open: false, 
      menuIntent: null, 
      loading: false 
    });
  };

  const handleConfirmMenuEdit = async () => {
    if (!menuEditConfirmDialog.menuIntent) return;

    setMenuEditConfirmDialog(prev => ({ ...prev, loading: true }));

    try {
      // Use the proper service layer instead of calling Python directly
      const result = await updateMenuItemWithIntent(
        menuEditConfirmDialog.menuIntent.original_text,
        'update_menu_item',
        {
          item_name: menuEditConfirmDialog.menuIntent.item_name,
          field: menuEditConfirmDialog.menuIntent.field,
          value: menuEditConfirmDialog.menuIntent.value
        }
      );
      
      console.log("Menu update successful:", result);
      
      if (result.success) {
        // Close dialog and show success message
        setMenuEditConfirmDialog({ open: false, menuIntent: null, loading: false });
        setSmsResult({
          sent: true,
          message: `Successfully updated ${menuEditConfirmDialog.menuIntent.item_name} ${menuEditConfirmDialog.menuIntent.field} to ${menuEditConfirmDialog.menuIntent.value}!`,
          intent: 'edit_menu_item'
        });
      } else {
        throw new Error(result.message || 'Failed to update menu item');
      }
    } catch (error) {
      console.error("Error confirming menu update:", error);
      setMenuEditConfirmDialog(prev => ({ ...prev, loading: false }));
      setSmsResult({
        sent: false,
        error: `Error confirming menu update: ${error instanceof Error ? error.message : 'Unknown error'}`,
        intent: 'edit_menu_item'
      });
    }
  };

  async function startListening() {
    try {
              // Clear previous results when starting new recording
        setSmsResult(null);
        setSmsStatus(null);
        setDetectedIntent(null);
        setWinBackDialog({ open: false, message: "" });
      
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("file", audioBlob, "speech.webm");

          // send to Python backend
          const response = await fetch("http://localhost:3001/api/ai/listen", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            // Try to parse error response from backend
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
              const errorData = await response.json();
              if (errorData.detail) {
                // Handle both string and object detail formats
                if (typeof errorData.detail === 'string') {
                  errorMessage = errorData.detail;
                } else if (errorData.detail.message) {
                  errorMessage = errorData.detail.message;
                } else if (errorData.detail.error) {
                  errorMessage = errorData.detail.error;
                }
              }
            } catch (parseError) {
              // If parsing fails, use the status text or default message
              errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
          }

          const data = await response.json();
          console.log("Transcription result:", data);
          console.log("Intent detection:", data.intent);
          console.log("SMS sent:", data.sms_sent);
          console.log("SMS error:", data.sms_error);
          
          // Update transcription
          setTranscription(data.text);
          
          // Handle SMS result and intent detection
          if (data.intent && data.intent.intent !== 'none') {
            // Store the detected intent permanently
            setDetectedIntent(data.intent);
            
            console.log("Setting SMS result with data:", {
              sms_sent: data.sms_sent,
              sms_result: data.sms_result,
              sms_error: data.sms_error
            });
            
            // Check for win back customer intent
            if (data.intent.intent === 'win back customer') {
              console.log("Win back customers intent detected - showing process modal");
              const winBackMessage = data.win_back_message || data.intent.message || "Come back and enjoy special offers";
              
              // Show process modal first
              showProcessModal(data.intent.intent, winBackMessage);
              
              // Then execute the action after a delay
              setTimeout(() => {
                setWinBackDialog({ 
                  open: true, 
                  message: winBackMessage 
                });
                const winBackResult = {
                  sent: true,
                  message: `Opening Win Back Customers dialog with message: "${winBackMessage}"`,
                  intent: data.intent.intent
                };
                setSmsResult(winBackResult);
                setSmsStatus({ sent: true });
              }, 2500);
            } else if (data.intent.intent === 'edit_menu_item') {
              console.log("Edit menu item intent detected - processing with GPT");
              
              // Show process modal first
              showProcessModal(data.intent.intent, "Processing menu item edit request...");
              
              // Then execute the action after a delay with GPT processing
              setTimeout(async () => {
                try {
                  // Send the text to GPT for menu intent processing
                  const menuResponse = await fetch("http://localhost:3001/api/ai/process-menu-intent", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      text: data.text || '',
                      context: 'bizkeeper-agent'
                    }),
                  });

                  if (menuResponse.ok) {
                    const menuData = await menuResponse.json();
                    console.log("GPT menu intent processing result:", menuData);
                    
                    const menuIntent = menuData.intent;
                    
                    if (menuIntent.action === 'edit_item' && menuIntent.item_name && menuIntent.field && menuIntent.value) {
                      // Show confirmation dialog for menu item update
                      console.log("Showing confirmation dialog for menu item update:", menuIntent);
                      
                      // Add original_text to the menuIntent for the confirmation dialog
                      const menuIntentWithText = {
                        ...menuIntent,
                        original_text: data.text || ''
                      };
                      
                      setMenuEditConfirmDialog({
                        open: true,
                        menuIntent: menuIntentWithText,
                        loading: false
                      });
                      
                      setSmsResult({
                        sent: true,
                        message: `Please confirm the change to "${menuIntent.item_name}"`,
                        intent: data.intent.intent
                      });
                    } else {
                      // Fallback if GPT couldn't parse the intent properly
                      setSmsResult({
                        sent: true,
                        message: "I understood you want to edit a menu item, but I need more specific details. Please try again with the item name, field (name/price/description), and new value.",
                        intent: data.intent.intent
                      });
                    }
                  } else {
                    throw new Error("Failed to process menu intent");
                  }
                } catch (error) {
                  console.error("Error processing menu intent:", error);
                  setSmsResult({
                    sent: false,
                    error: "Failed to process menu item edit request. Please try again.",
                    intent: data.intent.intent
                  });
                }
                setSmsStatus({ sent: true });
              }, 2500);
            } else if (data.intent.intent === 'build webpage') {
              console.log("Build webpage intent detected");
              
              // Use the full transcribed text as the description if available, otherwise use intent message
              // This ensures we have enough detail to auto-generate
              const transcribedText = data.text || "";
              const intentMessage = data.intent.message || "";
              const buildWebpageMessage = data.build_webpage_message || intentMessage || transcribedText || "Building a webpage for your business";
              
              // If the intent message is too generic, use the full transcribed text
              let finalMessage = buildWebpageMessage;
              if (buildWebpageMessage.length < 20 && transcribedText && transcribedText.length > 20) {
                finalMessage = transcribedText;
              }
              
              // Show process modal first
              showProcessModal(data.intent.intent, finalMessage);
              
              // Show process modal for build webpage
              setTimeout(() => {
                const buildWebpageResult = {
                  sent: true,
                  message: `Webpage building feature coming soon!`,
                  intent: data.intent.intent
                };
                setSmsResult(buildWebpageResult);
                setSmsStatus({ sent: true });
              }, 2500);
            } else {
              // Handle other intents (announcements, etc.)
              const message = data.sms_result?.formatted_message || data.intent.message || "Processing your request";
              
              // Show process modal first
              showProcessModal(data.intent.intent, message);
              
              // Then execute the action after a delay
              setTimeout(() => {
                if (data.sms_sent) {
                  // SMS was sent successfully
                  const smsResultData = {
                    sent: true,
                    message: `SMS sent successfully! ${data.sms_result?.formatted_message || ''}`,
                    intent: data.intent.intent
                  };
                  console.log("Setting successful SMS result:", smsResultData);
                  setSmsResult(smsResultData);
                  setSmsStatus({ sent: true });
                } else if (data.sms_error) {
                  // Intent detected but SMS failed
                  const smsResultData = {
                    sent: false,
                    error: data.sms_error,
                    intent: data.intent.intent
                  };
                  console.log("Setting failed SMS result:", smsResultData);
                  setSmsResult(smsResultData);
                  setSmsStatus({ sent: false, error: data.sms_error });
                } else {
                  // Intent detected but no SMS was attempted (shouldn't happen)
                  const smsResultData = {
                    sent: false,
                    error: "Intent detected but SMS not sent",
                    intent: data.intent.intent
                  };
                  console.log("Setting no SMS result:", smsResultData);
                  setSmsResult(smsResultData);
                  setSmsStatus({ sent: false, error: "Intent detected but SMS not sent" });
                }
              }, 2500);
            }
          } else {
            // No intent detected
            setDetectedIntent(null);
            setSmsResult(null);
          }
          
          // Clear SMS result after 5 seconds (but keep detected intent)
          setTimeout(() => {
            setSmsResult(null);
          }, 5000);
          
        } catch (error: any) {
          console.error("Error processing audio:", error);
          let errorMessage = "Error processing audio.";
          
          if (error.message?.includes("HTTP error")) {
            // Use the error message from the backend (already parsed above)
            errorMessage = error.message.replace("HTTP error! status: ", "");
          } else if (error.message?.includes("quota exceeded") || error.message?.includes("quota")) {
            errorMessage = error.message;
          } else if (error.message?.includes("rate limit")) {
            errorMessage = error.message;
          } else if (error.message?.includes("Failed to fetch")) {
            errorMessage = "Cannot connect to Python service. Make sure it's running on port 3002.";
          } else {
            errorMessage = error.message || errorMessage;
          }
          
          setSmsResult({
            sent: false,
            error: errorMessage
          });
        }
      };

      mediaRecorder.start();
      console.log("MediaRecorder started");
    } catch (error: any) {
      console.error("Error accessing microphone:", error);
      setSmsResult({
        sent: false,
        error: "Error accessing microphone. Please check permissions."
      });
    }
  }

  function stopListening() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      console.log("MediaRecorder stopped");
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
    
    mediaRecorder = null;
  }

  const handleMicrophoneClick = () => {
    if (isListening) {
      // Stop listening
      stopListening();
      setIsListening(false);
      console.log('Stopped listening');
    } else {
      // Start listening
      startListening();
      setIsListening(true);
      console.log('Started listening');
      // Clear previous results
      setTranscription('');
      setSmsResult(null);
      setSmsStatus(null);
      setDetectedIntent(null);
    }
  };


  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const [inputValue, setInputValue] = useState('');

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      setTranscription(inputValue);
      // Process the input text similar to voice input
      processTranscription(inputValue);
      setInputValue('');
    }
  };

  const processTranscription = async (text: string) => {
    // Process text input similar to voice commands
    try {
      const response = await fetch("http://localhost:3001/api/ai/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        // Try to parse error response from backend
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            // Handle both string and object detail formats
            if (typeof errorData.detail === 'string') {
              errorMessage = errorData.detail;
            } else if (errorData.detail.message) {
              errorMessage = errorData.detail.message;
            } else if (errorData.detail.error) {
              errorMessage = errorData.detail.error;
            }
          }
        } catch (parseError) {
          // If parsing fails, use the status text or default message
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Text processing result:", data);
      console.log("Intent detection:", data.intent);
      console.log("SMS sent:", data.sms_sent);
      console.log("SMS error:", data.sms_error);
      
      // Update transcription
      setTranscription(data.text);
      
      // Handle SMS result and intent detection (same as voice commands)
      if (data.intent && data.intent.intent !== 'none') {
        // Store the detected intent permanently
        setDetectedIntent(data.intent);
        
        console.log("Setting SMS result with data:", {
          sms_sent: data.sms_sent,
          sms_result: data.sms_result,
          sms_error: data.sms_error
        });
        
        // Check for win back customer intent
        if (data.intent.intent === 'win back customer') {
          console.log("Win back customers intent detected - showing process modal");
          const winBackMessage = data.win_back_message || data.intent.message || "Come back and enjoy special offers";
          
          // Show process modal first
          showProcessModal(data.intent.intent, winBackMessage);
          
          // Then execute the action after a delay
          setTimeout(() => {
            setWinBackDialog({ 
              open: true, 
              message: winBackMessage 
            });
            const winBackResult = {
              sent: true,
              message: `Opening Win Back Customers dialog with message: "${winBackMessage}"`,
              intent: data.intent.intent
            };
            setSmsResult(winBackResult);
            setSmsStatus({ sent: true });
          }, 2500);
        } else if (data.intent.intent === 'edit_menu_item') {
          console.log("Edit menu item intent detected - processing with GPT");
          
          // Show process modal first
          showProcessModal(data.intent.intent, "Processing menu item edit request...");
          
          // Then execute the action after a delay with GPT processing
          setTimeout(async () => {
            try {
              // Send the text to GPT for menu intent processing
              const menuResponse = await fetch("http://localhost:3001/api/ai/process-menu-intent", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  text: data.text || '',
                  context: 'bizkeeper-agent'
                }),
              });

              if (menuResponse.ok) {
                const menuData = await menuResponse.json();
                console.log("GPT menu intent processing result:", menuData);
                
                const menuIntent = menuData.intent;
                
                if (menuIntent.action === 'edit_item' && menuIntent.item_name && menuIntent.field && menuIntent.value) {
                  // Show confirmation dialog for menu item update
                  console.log("Showing confirmation dialog for menu item update:", menuIntent);
                  
                  // Add original_text to the menuIntent for the confirmation dialog
                  const menuIntentWithText = {
                    ...menuIntent,
                    original_text: data.text || ''
                  };
                  
                  setMenuEditConfirmDialog({
                    open: true,
                    menuIntent: menuIntentWithText,
                    loading: false
                  });
                  
                  setSmsResult({
                    sent: true,
                    message: `Please confirm the change to "${menuIntent.item_name}"`,
                    intent: data.intent.intent
                  });
                } else {
                  // Fallback if GPT couldn't parse the intent properly
                  setSmsResult({
                    sent: true,
                    message: "I understood you want to edit a menu item, but I need more specific details. Please try again with the item name, field (name/price/description), and new value.",
                    intent: data.intent.intent
                  });
                }
              } else {
                throw new Error("Failed to process menu intent");
              }
            } catch (error) {
              console.error("Error processing menu intent:", error);
              setSmsResult({
                sent: false,
                error: "Failed to process menu item edit request. Please try again.",
                intent: data.intent.intent
              });
            }
            setSmsStatus({ sent: true });
          }, 2500);
        } else if (data.intent.intent === 'build webpage') {
          console.log("Build webpage intent detected - navigating to IT Agent");
          
          // Use the full text as the description if available, otherwise use intent message
          // This ensures we have enough detail to auto-generate
          const inputText = data.text || "";
          const intentMessage = data.intent.message || "";
          const buildWebpageMessage = data.build_webpage_message || intentMessage || inputText || "Building a webpage for your business";
          
          // If the intent message is too generic, use the full text
          let finalMessage = buildWebpageMessage;
          if (buildWebpageMessage.length < 20 && inputText && inputText.length > 20) {
            finalMessage = inputText;
          }
          
          // Show process modal first
          showProcessModal(data.intent.intent, finalMessage);
          
          // Then navigate to IT Agent after a delay
          setTimeout(() => {
            const buildWebpageResult = {
              sent: true,
              message: `Webpage building feature coming soon!`,
              intent: data.intent.intent
            };
            setSmsResult(buildWebpageResult);
            setSmsStatus({ sent: true });
          }, 2500);
        } else {
          // Handle other intents (announcements, etc.)
          const message = data.sms_result?.formatted_message || data.intent.message || "Processing your request";
          
          // Show process modal first
          showProcessModal(data.intent.intent, message);
          
          // Then execute the action after a delay
          setTimeout(() => {
            if (data.sms_sent) {
              // SMS was sent successfully
              const smsResultData = {
                sent: true,
                message: `SMS sent successfully! ${data.sms_result?.formatted_message || ''}`,
                intent: data.intent.intent
              };
              console.log("Setting successful SMS result:", smsResultData);
              setSmsResult(smsResultData);
              setSmsStatus({ sent: true });
            } else if (data.sms_error) {
              // Intent detected but SMS failed
              const smsResultData = {
                sent: false,
                error: data.sms_error,
                intent: data.intent.intent
              };
              console.log("Setting failed SMS result:", smsResultData);
              setSmsResult(smsResultData);
              setSmsStatus({ sent: false, error: data.sms_error });
            } else {
              // Intent detected but no SMS was attempted (shouldn't happen)
              const smsResultData = {
                sent: false,
                error: "Intent detected but SMS not sent",
                intent: data.intent.intent
              };
              console.log("Setting no SMS result:", smsResultData);
              setSmsResult(smsResultData);
              setSmsStatus({ sent: false, error: "Intent detected but SMS not sent" });
            }
          }, 2500);
        }
      } else {
        // No intent detected
        setDetectedIntent(null);
        setSmsResult(null);
      }
      
      // Clear SMS result after 5 seconds (but keep detected intent)
      setTimeout(() => {
        setSmsResult(null);
      }, 5000);
      
    } catch (error: any) {
      console.error("Error processing text:", error);
      let errorMessage = "Error processing text input.";
      
      if (error.message?.includes("HTTP error")) {
        // Use the error message from the backend (already parsed above)
        errorMessage = error.message.replace("HTTP error! status: ", "");
      } else if (error.message?.includes("quota exceeded") || error.message?.includes("quota")) {
        errorMessage = error.message;
      } else if (error.message?.includes("rate limit")) {
        errorMessage = error.message;
      } else if (error.message?.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to Python service. Make sure it's running on port 3002.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setSmsResult({
        sent: false,
        error: errorMessage
      });
    }
  };
  
  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 4 },
        backgroundColor: '#f7f7f8'
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 3 }}>
        <img 
          src={require('../assets/keeper.png')} 
          alt="Bizkeeper" 
          style={{ 
            width: 150, 
            height: 150, 
            objectFit: 'contain',
            filter: isListening ? 'drop-shadow(0 0 20px rgba(116, 67, 192, 0.6))' : 'none',
            transition: 'filter 0.3s ease'
          }} 
        />
      </Box>

      {/* Title */}
      <Typography 
        variant="h4" 
        fontWeight={600} 
        sx={{ 
          color: '#2d333a',
          mb: 4,
          textAlign: 'center'
        }}
      >
        What can I do for you?
      </Typography>

      {/* Input Box */}
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: 800,
          height: 120,
          backgroundColor: 'white',
          borderRadius: 3,
          border: '1px solid #e5e5e5',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          mb: 4,
          overflow: 'hidden'
        }}
      >
        {/* Input Field */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          p: 2,
          gap: 2,
          height: '100%'
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
            placeholder="Need help with your restaurant? Just tell me what to do"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: '#2d333a',
              backgroundColor: 'transparent',
              padding: '8px 0',
              alignSelf: 'flex-start'
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton
              onClick={handleMicrophoneClick}
              sx={{
                backgroundColor: isListening ? '#E91E63' : '#7443C0',
                color: 'white',
                width: 44,
                height: 44,
                '&:hover': {
                  backgroundColor: isListening ? '#C2185B' : '#5C359A',
                },
                boxShadow: isListening ? '0 0 15px rgba(233, 30, 99, 0.5)' : 'none',
              }}
            >
              {isListening ? <MicOff sx={{ fontSize: 22 }} /> : <Mic sx={{ fontSize: 22 }} />}
            </IconButton>
            <IconButton
              onClick={handleInputSubmit}
              sx={{
                color: inputValue.trim() ? '#7443C0' : '#ccc',
                '&:hover': {
                  backgroundColor: inputValue.trim() ? 'rgba(116, 67, 192, 0.1)' : 'transparent',
                },
              }}
              disabled={!inputValue.trim()}
            >
              <span style={{ fontSize: 24, transform: 'rotate(-45deg)', display: 'inline-block' }}>➤</span>
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Recording Status */}
      {isListening && (
        <Box 
          sx={{ 
            mb: 3, 
            p: 2, 
            backgroundColor: 'rgba(116, 67, 192, 0.08)',
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: 500
          }}
        >
          <Typography variant="body2" sx={{ color: '#7443C0', fontWeight: 500 }}>
            🎤 Recording in progress... Click the mic button to stop.
          </Typography>
        </Box>
      )}

      {/* Transcription Display */}
      {transcription && !isListening && (
        <Fade in={true} timeout={500}>
          <Box 
            sx={{ 
              mb: 3, 
              p: 3, 
              backgroundColor: 'white',
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              maxWidth: 600,
              width: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#2d333a', mb: 1, fontWeight: 600 }}>
              You said:
            </Typography>
            <Typography variant="body1" sx={{ color: '#6e7781', fontStyle: 'italic' }}>
              "{transcription}"
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Error Display */}
      {smsResult && smsResult.error && (
        <Fade in={true} timeout={500}>
          <Box sx={{ mb: 3, maxWidth: 600, width: '100%' }}>
            <Alert severity="error">{smsResult.error}</Alert>
          </Box>
        </Fade>
      )}

      {/* Win Back Customers Dialog */}
      <WinBackCustomersDialog
        open={winBackDialog.open}
        onClose={() => setWinBackDialog({ open: false, message: "" })}
        voiceMessage={winBackDialog.message}
      />



      {/* Menu Item Edit Confirmation Dialog */}
      <MenuItemEditConfirmDialog
        open={menuEditConfirmDialog.open}
        onClose={handleCloseMenuEditConfirmDialog}
        onConfirm={handleConfirmMenuEdit}
        menuIntent={menuEditConfirmDialog.menuIntent}
        loading={menuEditConfirmDialog.loading}
      />


      {/* Process Modal */}
      <Dialog
        open={processModal.open}
        onClose={() => setProcessModal({ open: false, intent: "", targetAgent: "", message: "", processing: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <CheckCircle sx={{ color: '#1976D2' }} />
            <Typography variant="h6" fontWeight={600}>
              Processing Request
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            {processModal.processing ? (
              <>
                <CircularProgress sx={{ color: '#1976D2', mb: 3 }} size={60} />
                <Typography variant="h6" gutterBottom>
                  Sending this to the {processModal.targetAgent}...
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Intent: <strong>{processModal.intent}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {processModal.message}
                </Typography>
              </>
            ) : (
              <>
                <CheckCircle sx={{ color: '#4CAF50', fontSize: 60, mb: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Request sent to {processModal.targetAgent}!
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  The {processModal.targetAgent} is now handling your request.
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setProcessModal({ open: false, intent: "", targetAgent: "", message: "", processing: false })}
            variant="contained"
            startIcon={<CheckCircle />}
            disabled={processModal.processing}
            sx={{
              backgroundColor: '#1976D2',
              '&:hover': {
                backgroundColor: '#1976D2',
                filter: 'brightness(0.9)'
              }
            }}
          >
            {processModal.processing ? 'Processing...' : 'Got it!'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BizkeeperPage;
