// src/components/ActionsHeader.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import CreateLogModal from './CreateLogModal';

export default function ActionsHeader({ customerId, createLog }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6">Interaction History</Typography>
      <>
        <Button variant="contained" onClick={handleOpen}>
          Create Log
        </Button>
        <CreateLogModal
          open={open}
          onClose={handleClose}
          customerId={customerId}
          createLog={createLog}
        />
      </>
    </Box>
  );
}   