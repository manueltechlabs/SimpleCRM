// src/components/CreateLogModal.js
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function CreateLogModal({ open, onClose, customerId, createLog }) {
  const [newLog, setNewLog] = useState({
    interactionType: 'NOTE',
    subject: '',
    notes: '',
  });

  const handleSubmit = async () => {
    await createLog(customerId, newLog);
    onClose();
    setNewLog({ interactionType: 'NOTE', subject: '', notes: '' });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        p: 4,
        bgcolor: 'background.paper',
        margin: '5% auto',
        width: { xs: '90%', sm: 500 },
      }}>
        <Typography variant="h6" gutterBottom>Create Interaction</Typography>
        <TextField
          label="Subject"
          fullWidth
          value={newLog.subject}
          onChange={(e) => setNewLog({ ...newLog, subject: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Notes"
          multiline
          rows={4}
          fullWidth
          value={newLog.notes}
          onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={newLog.interactionType}
            label="Type"
            onChange={(e) => setNewLog({ ...newLog, interactionType: e.target.value })}
          >
            <MenuItem value="CALL">Call</MenuItem>
            <MenuItem value="EMAIL">Email</MenuItem>
            <MenuItem value="MEETING">Meeting</MenuItem>
            <MenuItem value="NOTE">Note</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
        <Button onClick={onClose} sx={{ ml: 1 }}>Cancel</Button>
      </Box>
    </Modal>
  );
}