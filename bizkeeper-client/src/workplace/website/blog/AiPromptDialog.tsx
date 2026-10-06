import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { Close, Mic } from '@mui/icons-material';

interface AiPromptDialogProps {
  open: boolean;
  title: string;
  description?: string;
  placeholder?: string;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
}

const AiPromptDialog: React.FC<AiPromptDialogProps> = ({
  open,
  title,
  description,
  placeholder,
  submitLabel = 'Generate',
  onClose,
  onSubmit,
}) => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (open) setPrompt('');
  }, [open]);

  const handleSubmit = () => {
    onSubmit(prompt.trim());
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 700,
        }}
      >
        <span>{title}</span>
        <Button onClick={onClose} startIcon={<Close />} sx={{ textTransform: 'none' }}>
          Close
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 1.5 }}>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {description}
          </Typography>
        )}

        <TextField
          label="Prompt"
          multiline
          minRows={5}
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder || 'Describe what you want the AI to generate...'}
        />

        <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button startIcon={<Mic />} variant="outlined" disabled sx={{ textTransform: 'none' }}>
            Voice (coming soon)
          </Button>
          <Typography variant="caption" color="text.secondary">
            For now, type your prompt.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!prompt.trim()} sx={{ textTransform: 'none' }}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AiPromptDialog;


