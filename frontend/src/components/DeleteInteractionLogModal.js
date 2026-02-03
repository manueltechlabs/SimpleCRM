// src/components/DeleteInteractionLogModal.js
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';

export default function DeleteInteractionLogModal({ open, onClose, log, onConfirm }) {
  if (!log) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        p: 4,
        bgcolor: 'background.paper',
        margin: '10% auto',
        width: { xs: '90%', sm: 500 },
      }}>
        <Typography variant="h6" gutterBottom>Confirm Deletion</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography><strong>Type:</strong> {log.interactionType}</Typography>
        <Typography><strong>Subject:</strong> {log.subject}</Typography>
        <Typography><strong>Date:</strong> {new Date(log.createdAt).toLocaleString()}</Typography>
        <Typography mt={2}><strong>Notes:</strong> {log.notes}</Typography>
        <Divider sx={{ my: 2 }} />
        <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
        <Button variant="contained" color="error" onClick={() => onConfirm(log.id)}>
          Delete
        </Button>
      </Box>
    </Modal>
  );
}   