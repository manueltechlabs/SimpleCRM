// Detail.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

export default function Detail({ logs, customerId, refreshLogs, parseDate }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [open, setOpen] = useState(false);
  const [newLog, setNewLog] = useState({
    interactionType: 'note',
    subject: '',
    notes: ''
  });

  const handleCreateLog = async () => {
    await fetch(`http://127.0.0.1:8080/customers/${customerId}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog)
    });
    await refreshLogs();
    setOpen(false);
    setNewLog({ interactionType: 'note', subject: '', notes: '' });
    // In a real app, you would refresh the logs here
  };

  if (!logs) return null;

  const columns = [
    { 
      field: 'interactionType', 
      headerName: 'Type', 
      width: 120 
    },
    { 
      field: 'subject', 
      headerName: 'Subject', 
      flex: 1 
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 180,
      valueGetter: (value, row) => {
        if (!value) return '';
        const date = parseDate(value);
        return date ? date.toLocaleString() : '';
      }
    }
  ];

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Interaction History</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Log
        </Button>
      </Box>
      
      <DataGrid
        rows={logs}
        columns={columns}
        onRowClick={(params) => setSelectedLog(params.row)}
        autoHeight
        pageSize={10}
        disableColumnSelector
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />

      {/* Create Log Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ 
          p: 4, 
          bgcolor: 'background.paper', 
          margin: '5% auto', 
          width: { xs: '90%', sm: 500 }
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
          <Button variant="contained" onClick={handleCreateLog}>Save</Button>
          <Button onClick={() => setOpen(false)} sx={{ ml: 1 }}>Cancel</Button>
        </Box>
      </Modal>

      {/* View Log Modal */}
      <Modal open={!!selectedLog} onClose={() => setSelectedLog(null)}>
        <Box sx={{ 
          p: 4, 
          bgcolor: 'background.paper', 
          margin: '5% auto', 
          width: { xs: '90%', sm: 500 },
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {selectedLog && (
            <>
              <Typography variant="h6" gutterBottom>{selectedLog.subject}</Typography>
              <Typography>Type: {selectedLog.interactionType}</Typography>
              <Typography>Date: {selectedLog && parseDate(selectedLog.createdAt)?.toLocaleString()}</Typography>
              <Typography mt={2}>{selectedLog.notes}</Typography>
            </>
          )}
          <Button onClick={() => setSelectedLog(null)} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
}