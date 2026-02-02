// src/components/ActionsHeader.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import CreateLogModal from './CreateLogModal';
import EditCustomerModal from './EditCustomerModal';

export default function ActionsHeader({ customerId, createLog, onCustomerUpdate }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6">Interaction History</Typography>
      <Box>
        <Button
          variant="outlined"
          onClick={() => setOpenEdit(true)}
          sx={{ mr: 1 }}
        >
          Update Customer
        </Button>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          Create Log
        </Button>
        <CreateLogModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          customerId={customerId}
          createLog={createLog}
        />
        <EditCustomerModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          customerId={customerId}
          onCustomerUpdate={onCustomerUpdate}
        />
      </Box>
    </Box>
  );
}   