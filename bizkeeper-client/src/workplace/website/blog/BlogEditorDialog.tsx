import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Divider,
  Snackbar,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material';
import { AutoStories, Close, Image as ImageIcon, UploadFile, AutoAwesome } from '@mui/icons-material';
import AiPromptDialog from './AiPromptDialog';
import {
  BlogPost,
  createPost,
  editPost,
  deriveExcerptFromMarkdown,
  deriveReadTimeFromMarkdown,
  fileToDataUrl,
  inferCategoryFromText,
  generateBlogFromStory,
} from './blogService';

interface BlogEditorDialogProps {
  open: boolean;
  onClose: () => void;
  post?: BlogPost | null;
  onSave?: (post: BlogPost) => void;
}

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800';

const BlogEditorDialog: React.FC<BlogEditorDialogProps> = ({ open, onClose, post, onSave }) => {
  // -------- Content (Markdown) --------
  const [title, setTitle] = useState('');
  const [contentMd, setContentMd] = useState('');
  const [callToAction, setCallToAction] = useState('');

  // -------- Picture --------
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [imageDataUrl, setImageDataUrl] = useState<string>(''); // stored into the post
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // -------- AI dialogs (stub) --------
  const [aiContentOpen, setAiContentOpen] = useState(false);
  const [aiImagePromptOpen, setAiImagePromptOpen] = useState(false);

  // -------- AI generation loading states --------
  const [generatingContent, setGeneratingContent] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);

  // -------- Feedback --------
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'info' | 'success' | 'warning' }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const closeSnack = () => setSnack((s) => ({ ...s, open: false }));

  // Reset/init state on open
  useEffect(() => {
    if (!open) return;

    setTitle(post?.title || '');
    setContentMd(post?.content || '');
    setCallToAction(post?.callToAction || '');

    const img = post?.image || '';
    setImagePreviewUrl(img);
    setImageDataUrl(img);
  }, [open, post]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    };
  }, []);

  const isContentEmpty = useMemo(() => !contentMd.trim(), [contentMd]);

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview as object URL
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setImagePreviewUrl(objectUrl);

    // store as data URL for persistence in the local store
    try {
      const dataUrl = await fileToDataUrl(file);
      setImageDataUrl(dataUrl);
    } catch {
      setSnack({ open: true, message: 'Could not read image file.', severity: 'warning' });
    } finally {
      // allow re-uploading same file
      e.target.value = '';
    }
  };

  const handleAiGenerateImageFromContent = async () => {
    if (!contentMd.trim()) return;

    setGeneratingImage(true);

    try {
      const response = await fetch('http://localhost:3001/api/ai/generate-image-from-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: contentMd,
          title: title,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.image_url) {
        setImagePreviewUrl(data.image_url);
        setImageDataUrl(data.image_url);
        setSnack({
          open: true,
          message: 'Image generated successfully!',
          severity: 'success',
        });
      } else {
        throw new Error(data.message || 'Failed to generate image');
      }
    } catch (error: any) {
      console.error('Failed to generate image:', error);
      setSnack({
        open: true,
        message: error.message?.includes('Failed to fetch')
          ? 'Cannot connect to Python service. Using placeholder image.'
          : error.message || 'Failed to generate image. Using placeholder.',
        severity: 'warning',
      });

      // Fallback to placeholder
      if (!imageDataUrl) {
        setImagePreviewUrl(DEFAULT_PLACEHOLDER_IMAGE);
        setImageDataUrl(DEFAULT_PLACEHOLDER_IMAGE);
      }
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleAiGenerateImageFromPrompt = async (prompt: string) => {
    if (!prompt.trim()) return;

    setAiImagePromptOpen(false);
    setGeneratingImage(true);

    try {
      const response = await fetch('http://localhost:3001/api/ai/generate-image-from-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.image_url) {
        setImagePreviewUrl(data.image_url);
        setImageDataUrl(data.image_url);
        setSnack({
          open: true,
          message: 'Image generated successfully!',
          severity: 'success',
        });
      } else {
        throw new Error(data.message || 'Failed to generate image');
      }
    } catch (error: any) {
      console.error('Failed to generate image:', error);
      setSnack({
        open: true,
        message: error.message?.includes('Failed to fetch')
          ? 'Cannot connect to Python service. Using placeholder image.'
          : error.message || 'Failed to generate image. Using placeholder.',
        severity: 'warning',
      });

      // Fallback to placeholder
      if (!imageDataUrl) {
        setImagePreviewUrl(DEFAULT_PLACEHOLDER_IMAGE);
        setImageDataUrl(DEFAULT_PLACEHOLDER_IMAGE);
      }
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleAiGenerateContentFromPrompt = async (prompt: string) => {
    if (!prompt.trim()) return;

    setAiContentOpen(false);
    setGeneratingContent(true);

    try {
      const result = await generateBlogFromStory(prompt);
      setTitle(result.title);
      setContentMd(result.content);
      setCallToAction(result.callToAction);
      setSnack({
        open: true,
        message: 'Content generated successfully!',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Failed to generate content:', error);
      setSnack({
        open: true,
        message: error.message?.includes('Failed to fetch')
          ? 'Cannot connect to Python service. Make sure it\'s running on port 3002.'
          : error.message || 'Failed to generate content',
        severity: 'warning',
      });
    } finally {
      setGeneratingContent(false);
    }
  };

  const canSave = useMemo(() => !!title.trim() && !!contentMd.trim(), [title, contentMd]);

  const handleSave = (status: BlogPost['status']) => {
    if (!canSave) {
      setSnack({ open: true, message: 'Please provide a title and content.', severity: 'warning' });
      return;
    }

    const excerpt = deriveExcerptFromMarkdown(contentMd);
    const readTime = deriveReadTimeFromMarkdown(contentMd);
    const category = inferCategoryFromText(contentMd) || post?.category || 'Story';
    const image = imageDataUrl || post?.image || '';

    if (post?.id) {
      const updated = editPost(post.id, {
        title: title.trim(),
        content: contentMd,
        callToAction: callToAction.trim(),
        excerpt,
        readTime,
        category,
        image,
        status,
      });
      if (updated) {
        setSnack({ open: true, message: 'Saved.', severity: 'success' });
        onSave?.(updated);
      } else {
        setSnack({ open: true, message: 'Save failed.', severity: 'warning' });
      }
      return;
    }

    const created = createPost({
      title: title.trim(),
      excerpt,
      content: contentMd,
      callToAction: callToAction.trim(),
      author: 'Demo User',
      category,
      tags: ['blog'],
      image: image || DEFAULT_PLACEHOLDER_IMAGE,
      featured: false,
      views: 0,
      comments: 0,
      generatedBy: 'manual',
      agentPrompt: '',
      status,
      readTime,
    });

    setSnack({ open: true, message: 'Created.', severity: 'success' });
    onSave?.(created);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, minHeight: 650 } }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#7443C0',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoStories />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {post ? 'Edit Blog Post' : 'New Blog Post'}
            </Typography>
          </Box>
          <Button onClick={onClose} startIcon={<Close />} sx={{ textTransform: 'none', color: 'white' }}>
            Close
          </Button>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '380px 1fr' },
              gap: 2,
              alignItems: 'start',
            }}
          >
            {/* Picture panel */}
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ImageIcon sx={{ color: '#7443C0' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Picture
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Upload an image, or use AI buttons (coming soon).
                </Typography>

                <Box
                  sx={{
                    width: '100%',
                    height: 220,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {imagePreviewUrl ? (
                    <Box
                      component="img"
                      src={imagePreviewUrl}
                      alt="Blog preview"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                      <ImageIcon sx={{ fontSize: 48, opacity: 0.4 }} />
                      <Typography variant="caption" display="block">
                        No image yet
                      </Typography>
                    </Box>
                  )}
                </Box>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
                  <Button
                    onClick={handlePickFile}
                    variant="outlined"
                    startIcon={<UploadFile />}
                    disabled={generatingImage}
                    sx={{ textTransform: 'none' }}
                  >
                    Upload
                  </Button>
                  <Button
                    onClick={handleAiGenerateImageFromContent}
                    variant="outlined"
                    startIcon={generatingImage ? <CircularProgress size={16} /> : <AutoAwesome />}
                    disabled={isContentEmpty || generatingImage}
                    sx={{ textTransform: 'none' }}
                  >
                    {generatingImage ? 'Generating...' : 'AI from content'}
                  </Button>
                  <Button
                    onClick={() => setAiImagePromptOpen(true)}
                    variant="outlined"
                    startIcon={<AutoAwesome />}
                    disabled={generatingImage}
                    sx={{ textTransform: 'none' }}
                  >
                    AI from prompt/voice
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* Content panel */}
            <Paper variant="outlined" sx={{ borderRadius: 2 }}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Content
                  </Typography>
                  <Button
                    onClick={() => setAiContentOpen(true)}
                    variant="outlined"
                    startIcon={generatingContent ? <CircularProgress size={16} /> : <AutoAwesome />}
                    disabled={generatingContent}
                    sx={{ textTransform: 'none' }}
                  >
                    {generatingContent ? 'Generating...' : 'AI generate'}
                  </Button>
                </Box>

                <TextField
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your post a title..."
                />

                <Divider sx={{ my: 2 }} />

                <TextField
                  label="Markdown content"
                  fullWidth
                  multiline
                  minRows={14}
                  value={contentMd}
                  onChange={(e) => setContentMd(e.target.value)}
                  placeholder="Write here... (Markdown supported)\n\nTip: You can paste content here — formatting will be simplified."
                  sx={{
                    '& .MuiInputBase-root': {
                      fontFamily:
                        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                    },
                  }}
                />

                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Call to action (optional)"
                    fullWidth
                    value={callToAction}
                    onChange={(e) => setCallToAction(e.target.value)}
                    placeholder="e.g., Book a table today..."
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button onClick={() => handleSave('draft')} variant="outlined" disabled={!canSave} sx={{ textTransform: 'none' }}>
            Save Draft
          </Button>
          <Button onClick={() => handleSave('published')} variant="contained" disabled={!canSave} sx={{ textTransform: 'none' }}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>

      <AiPromptDialog
        open={aiImagePromptOpen}
        title="Generate picture"
        description="Add extra text for the AI to generate an image. (Backend not wired yet.)"
        placeholder="e.g., A warm coffee shop interior, cinematic lighting..."
        submitLabel="Generate image"
        onClose={() => setAiImagePromptOpen(false)}
        onSubmit={handleAiGenerateImageFromPrompt}
      />

      <AiPromptDialog
        open={aiContentOpen}
        title="Generate content"
        description="Add extra text for the AI to generate blog content. (Backend not wired yet.)"
        placeholder="e.g., Write a blog post about our new seasonal menu..."
        submitLabel="Generate content"
        onClose={() => setAiContentOpen(false)}
        onSubmit={handleAiGenerateContentFromPrompt}
      />

      <Snackbar open={snack.open} autoHideDuration={2500} onClose={closeSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snack.severity} onClose={closeSnack} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogEditorDialog;


