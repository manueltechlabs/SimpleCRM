// CustomerView.js
import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import Master from './Master';
import Detail from './Detail';
import { useCustomerApi } from '../hooks/useCustomerApi';

export default function CustomerView() {
  const { customer, logs, loading, createLog, refreshLogs, parseDate } = useCustomerApi();

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (!customer) return <div>No customer found</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Master customer={customer} parseDate={parseDate} />
      <Detail 
        logs={logs} 
        customerId={customer.id} 
        createLog={createLog} 
        refreshLogs={refreshLogs} 
        parseDate={parseDate} 
      />
    </Box>
  );
}   