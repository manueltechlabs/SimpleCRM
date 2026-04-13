// src/components/AnswerModal.js
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';

export default function AnswerModal({ open, onClose, message }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        p: 4,
        bgcolor: 'background.paper',
        margin: '15% auto',
        width: { xs: '90%', sm: 400 },
        textAlign: 'center',
      }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Response
        </Typography>
        <Typography mt={2}>{message}</Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 3 }}>
          OK
        </Button>
      </Box>
    </Modal>
  );
}