// src/components/ActionsHeader.js
import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';

export default function ActionsHeader({ onCreateClick }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6">Interaction History</Typography>
      <Button variant="contained" onClick={onCreateClick}>
        Create Log
      </Button>
    </Box>
  );
}