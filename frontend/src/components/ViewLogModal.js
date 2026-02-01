// src/components/ViewLogModal.js
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';

export default function ViewLogModal({ log, onClose, parseDate }) {
  if (!log) return null;

  return (
    <Modal open={!!log} onClose={onClose}>
      <Box sx={{
        p: 4,
        bgcolor: 'background.paper',
        margin: '5% auto',
        width: { xs: '90%', sm: 500 },
        maxHeight: '90vh',
        overflow: 'auto',
      }}>
        <Typography variant="h6" gutterBottom>{log.subject}</Typography>
        <Typography>Type: {log.interactionType}</Typography>
        <Typography>Date: {parseDate(log.createdAt)?.toLocaleString() ?? 'N/A'}</Typography>
        <Typography mt={2}>{log.notes}</Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
      </Box>
    </Modal>
  );
}   