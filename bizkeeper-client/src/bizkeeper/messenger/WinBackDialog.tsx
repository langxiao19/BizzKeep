import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import { Send, Celebration, CalendarToday, PersonAdd } from '@mui/icons-material';

interface Customer {
  id: string;
  name: string;
  phone: string;
  birthday: string;
  last_visit: string;
  amount_spent: number;
}

interface WinBackCustomersDialogProps {
  open: boolean;
  onClose: () => void;
  voiceMessage?: string;
}

export const WinBackCustomersDialog: React.FC<WinBackCustomersDialogProps> = ({
  open,
  onClose,
  voiceMessage,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendingIndividual, setSendingIndividual] = useState<{ [key: string]: boolean }>({});
  const [editingMessage, setEditingMessage] = useState<{ [key: string]: boolean }>({});
  const [customMessages, setCustomMessages] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Helper function to make messages more personal
  const makeMessagePersonal = (message: string) => {
    return message
      .replace(/\bthey\b/gi, 'you')
      .replace(/\btheir\b/gi, 'your')
      .replace(/\bthem\b/gi, 'you')
      .replace(/\bcustomers?\b/gi, 'you')
      .replace(/\bpeople\b/gi, 'you')
      .replace(/\banyone\b/gi, 'you')
      .replace(/\bsomeone\b/gi, 'you');
  };

  useEffect(() => {
    if (open) {
      loadDemoCustomers();
      
      // If we have a voice message, pre-fill all customer messages
      if (voiceMessage) {
        const voiceBasedMessages: { [key: string]: string } = {};
        customers.forEach(customer => {
          if (isInactiveCustomer(customer)) {
            // Combine voice message with tiered discount structure
            const baseMessage = makeMessagePersonal(voiceMessage);
            const discountInfo = getDiscountInfo(customer);
            voiceBasedMessages[customer.id] = `Hey ${customer.name}! 🍽️ ${baseMessage} ${discountInfo}`;
          }
        });
        setCustomMessages(voiceBasedMessages);
      }
    }
  }, [open, voiceMessage, customers]);

  const loadDemoCustomers = async () => {
    setLoading(true);
    try {
      // For now, we'll use the demo clients from the Python service
      // In a real implementation, this would call an API endpoint
      const demoCustomers: Customer[] = [
        {
          id: "0",
          name: "John Doe",
          phone: "+18777804236",
          birthday: "1990-08-30",
          last_visit: "2025-06-15", // 2+ months ago
          amount_spent: 100
        },
        {
          id: "1",
          name: "Sarah Johnson",
          phone: "+18777804236",
          birthday: "1985-08-30",
          last_visit: "2025-01-25", // 7+ months ago
          amount_spent: 75
        },
        {
          id: "2",
          name: "Michael Chen",
          phone: "+18777804236",
          birthday: "1992-11-08",
          last_visit: "2025-07-28", // Recent visit
          amount_spent: 120
        },
        {
          id: "3",
          name: "Emily Rodriguez",
          phone: "+18777804236",
          birthday: "1988-08-30",
          last_visit: "2025-05-20", // 3+ months ago
          amount_spent: 95
        }
      ];
      setCustomers(demoCustomers);
      console.log('Loaded demo customers:', demoCustomers);
    } catch (err) {
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const isInactiveCustomer = (customer: Customer) => {
    const lastVisit = new Date(customer.last_visit);
    const today = new Date();
    const monthsSinceVisit = (today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    
    console.log(`Customer ${customer.name}: last visit ${customer.last_visit}, months since: ${monthsSinceVisit.toFixed(1)}`);
    
    return monthsSinceVisit > 2;
  };

  const getInactivityReason = (customer: Customer) => {
    const lastVisit = new Date(customer.last_visit);
    const today = new Date();
    const monthsSinceVisit = (today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    
    if (monthsSinceVisit > 6) {
      return 'Very Inactive (6+ months) 🚫';
    } else if (monthsSinceVisit > 4) {
      return 'Inactive (4+ months) ⚠️';
    } else {
      return 'Inactive (2+ months) 📅';
    }
  };

  const getDiscountTier = (customer: Customer) => {
    const lastVisit = new Date(customer.last_visit);
    const today = new Date();
    const monthsSinceVisit = (today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    
    if (monthsSinceVisit > 6) {
      return '25% OFF 💎';
    } else if (monthsSinceVisit > 4) {
      return '20% OFF 🥈';
    } else {
      return '15% OFF 🥉';
    }
  };

  const getDiscountInfo = (customer: Customer) => {
    const lastVisit = new Date(customer.last_visit);
    const today = new Date();
    const monthsSinceVisit = (today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    
    if (monthsSinceVisit > 6) {
      return `Come back and enjoy 25% off your next meal! Use code WELCOMEBACK25 at checkout.`;
    } else if (monthsSinceVisit > 4) {
      return `Come back and enjoy 20% off your next meal! Use code WELCOMEBACK20 at checkout.`;
    } else {
      return `Come back and enjoy 15% off your next meal! Use code WELCOMEBACK15 at checkout.`;
    }
  };

  const getWinBackMessage = (customer: Customer) => {
    const lastVisit = new Date(customer.last_visit);
    const today = new Date();
    const monthsSinceVisit = (today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    
    if (monthsSinceVisit > 6) {
      return `Hey ${customer.name}! 🍽️ We've missed you! It's been over 6 months since your last visit. Come back and enjoy 25% off your next meal! Use code WELCOMEBACK25 at checkout.`;
    } else if (monthsSinceVisit > 4) {
      return `Hey ${customer.name}! 🍽️ We've missed you! It's been over 4 months since your last visit. Come back and enjoy 20% off your next meal! Use code WELCOMEBACK20 at checkout.`;
    } else {
      return `Hey ${customer.name}! 🍽️ We've missed you! It's been over 2 months since your last visit. Come back and enjoy 15% off your next meal! Use code WELCOMEBACK15 at checkout.`;
    }
  };

  const getCurrentMessage = (customer: Customer) => {
    return customMessages[customer.id] || getWinBackMessage(customer);
  };

  const startEditingMessage = (customer: Customer) => {
    setEditingMessage(prev => ({ ...prev, [customer.id]: true }));
    if (!customMessages[customer.id]) {
      setCustomMessages(prev => ({ ...prev, [customer.id]: getWinBackMessage(customer) }));
    }
  };

  const saveMessage = (customer: Customer) => {
    setEditingMessage(prev => ({ ...prev, [customer.id]: false }));
  };

  const cancelEditing = (customer: Customer) => {
    setEditingMessage(prev => ({ ...prev, [customer.id]: false }));
    setCustomMessages(prev => ({ ...prev, [customer.id]: getWinBackMessage(customer) }));
  };

  const resetToDefault = (customer: Customer) => {
    setCustomMessages(prev => ({ ...prev, [customer.id]: getWinBackMessage(customer) }));
  };

  const sendWinBackSMS = async (customer: Customer) => {
    const message = getCurrentMessage(customer);
    
    try {
      const response = await fetch('http://localhost:3001/api/ai/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }

      return true;
    } catch (err) {
      console.error('Error sending SMS:', err);
      return false;
    }
  };

  const sendIndividualSMS = async (customer: Customer) => {
    setSendingIndividual(prev => ({ ...prev, [customer.id]: true }));
    setError('');
    setSuccess('');

    try {
      const success = await sendWinBackSMS(customer);
      if (success) {
        setSuccess(`🎉 Successfully sent win-back message to ${customer.name}! Check your phone for the SMS.`);
      } else {
        setError(`❌ Failed to send message to ${customer.name}. Please try again.`);
      }
    } catch (err) {
      setError(`❌ Error sending message to ${customer.name}: ${err}`);
    } finally {
      setSendingIndividual(prev => ({ ...prev, [customer.id]: false }));
    }
  };

  const handleSendAllWinBacks = async () => {
    setSending(true);
    setError('');
    setSuccess('');

    const inactiveCustomers = customers.filter(isInactiveCustomer);
    let successCount = 0;
    let failureCount = 0;

    for (const customer of inactiveCustomers) {
      const success = await sendWinBackSMS(customer);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    }

    if (failureCount === 0) {
      setSuccess(`🎉 Successfully sent ${successCount} win-back messages! Check your phone for all SMS notifications.`);
    } else if (successCount > 0) {
      setSuccess(`⚠️ Sent ${successCount} messages successfully. ${failureCount} failed. Check the console for details.`);
    } else {
      setError(`❌ Failed to send any win-back messages. Please check your Twilio configuration.`);
    }

    setSending(false);
  };

  const inactiveCustomers = customers.filter(isInactiveCustomer);
  console.log('Inactive customers:', inactiveCustomers);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonAdd sx={{ color: '#FF9800' }} />
        Win Back Customers
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Send personalized re-engagement messages to customers who haven't visited in over 2 months.
          <br />
          <strong>🎯 Tiered Discount System:</strong>
          <br />
          • <strong>2-4 months inactive:</strong> 15% off (WELCOMEBACK15)
          <br />
          • <strong>4-6 months inactive:</strong> 20% off (WELCOMEBACK20)
          <br />
          • <strong>6+ months inactive:</strong> 25% off (WELCOMEBACK25)
          <br />
          <small style={{ fontStyle: 'italic' }}>
            💡 <strong>Pro tip:</strong> Voice commands automatically get personalized! 
            Say "they can get a discount" and it becomes "you can get a discount" for each customer.
          </small>
        </Typography>
        
        {voiceMessage && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Voice Command Detected:</strong> "{voiceMessage}"
            <br />
            <small>
              ✨ <strong>Auto-personalized:</strong> "{voiceMessage}" → "{makeMessagePersonal(voiceMessage)}"
              <br />
              Messages have been pre-filled and personalized for each customer. You can edit them before sending.
            </small>
          </Alert>
        )}
        
        {/* Debug info */}
        <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, fontSize: '12px' }}>
          <Typography variant="caption" component="div">
            <strong>Debug Info:</strong><br/>
            Current Date: {new Date().toISOString().split('T')[0]}<br/>
            Total Customers: {customers.length}<br/>
            Inactive Customers: {inactiveCustomers.length}
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {inactiveCustomers.length === 0 ? (
              <Alert severity="info">
                No customers are inactive (haven't visited in over 2 months). All customers are currently engaged!
              </Alert>
            ) : (
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Inactive Customers to Re-engage ({inactiveCustomers.length})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    These customers will receive a personalized SMS with a discount offer to encourage them to return.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {inactiveCustomers.map((customer) => (
                    <Box
                      key={customer.id}
                      sx={{
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        backgroundColor: '#fafafa'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6">{customer.name}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip
                            label={getInactivityReason(customer)}
                            color="warning"
                            size="small"
                          />
                          <Chip
                            label={getDiscountTier(customer)}
                            color="success"
                            size="small"
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Last visit: {new Date(customer.last_visit).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            ${customer.amount_spent} total spent
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1 }} />
                      
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                        Message to be sent:
                      </Typography>
                      
                      {/* Editable Message Field */}
                      <Box sx={{ mt: 0.5, mb: 2 }}>
                        {editingMessage[customer.id] ? (
                          <Box>
                            <textarea
                              value={customMessages[customer.id] || getWinBackMessage(customer)}
                              onChange={(e) => setCustomMessages(prev => ({ ...prev, [customer.id]: e.target.value }))}
                              style={{
                                width: '100%',
                                minHeight: '80px',
                                padding: '8px',
                                border: '1px solid #FF9800',
                                borderRadius: '4px',
                                fontFamily: 'inherit',
                                fontSize: '14px',
                                resize: 'vertical'
                              }}
                              placeholder="Edit your message here..."
                            />
                            <Box sx={{ mt: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography 
                                variant="caption" 
                                color={(customMessages[customer.id] || getWinBackMessage(customer)).length > 160 ? 'error' : 'text.secondary'}
                              >
                                Character count: {(customMessages[customer.id] || getWinBackMessage(customer)).length}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                SMS limit: 160 characters
                              </Typography>
                            </Box>
                            {(customMessages[customer.id] || getWinBackMessage(customer)).length > 160 && (
                              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                                ⚠️ Message exceeds SMS limit and may be split into multiple messages
                              </Typography>
                            )}
                            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => saveMessage(customer)}
                                sx={{ backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#F57C00' } }}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => cancelEditing(customer)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="text"
                                size="small"
                                onClick={() => resetToDefault(customer)}
                                sx={{ color: '#666' }}
                              >
                                Reset to Default
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body2" sx={{ p: 1, backgroundColor: '#fff', borderRadius: 0.5, border: '1px solid #e0e0e0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                              {getCurrentMessage(customer)}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                  variant="text"
                                  size="small"
                                  onClick={() => startEditingMessage(customer)}
                                  sx={{ color: '#FF9800' }}
                                >
                                  ✏️ Edit Message
                                </Button>
                                {customMessages[customer.id] && customMessages[customer.id] !== getWinBackMessage(customer) && (
                                  <Chip
                                    label="Customized"
                                    size="small"
                                    sx={{ backgroundColor: '#FF980010', color: '#FF9800', fontSize: '10px' }}
                                  />
                                )}
                              </Box>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={sendingIndividual[customer.id] ? <CircularProgress size={16} /> : <Send />}
                                disabled={sendingIndividual[customer.id] || !(customMessages[customer.id] || getWinBackMessage(customer)).trim()}
                                onClick={() => sendIndividualSMS(customer)}
                                sx={{
                                  borderColor: '#FF9800',
                                  color: '#FF9800',
                                  '&:hover': {
                                    borderColor: '#F57C00',
                                    backgroundColor: '#FF980010'
                                  }
                                }}
                              >
                                {sendingIndividual[customer.id] ? 'Sending...' : 'Send SMS'}
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {inactiveCustomers.length > 0 && (
          <Button
            onClick={handleSendAllWinBacks}
            variant="contained"
            startIcon={sending ? <CircularProgress size={20} /> : <Send />}
            disabled={sending || inactiveCustomers.some(customer => !(customMessages[customer.id] || getWinBackMessage(customer)).trim())}
            sx={{ backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#F57C00' } }}
          >
            {sending ? 'Sending...' : `Send ${inactiveCustomers.length} Win-Back(s)`}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

