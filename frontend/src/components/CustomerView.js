// src/components/CustomerView.js
import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import Master from './Master';
import Detail from './Detail';
import ActionsHeader from './ActionsHeader';
import { useCustomerApi } from '../hooks/useCustomerApi';

export default function CustomerView() {
  const { customer, logs, loading, createLog, refreshLogs, parseDate } = useCustomerApi();

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (!customer) return <div>No customer found</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Master customer={customer} parseDate={parseDate} />
      <ActionsHeader customerId={customer.id} createLog={createLog} />
      <Detail logs={logs} refreshLogs={refreshLogs} parseDate={parseDate} />
    </Box>
  );
}   