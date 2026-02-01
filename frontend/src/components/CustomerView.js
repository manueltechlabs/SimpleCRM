// src/components/CustomerView.js
import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Master from './Master';
import Detail from './Detail';
import ActionsHeader from './ActionsHeader';
import { useCustomerApi } from '../hooks/useCustomerApi';

export default function CustomerView() {
  const { customer, logs, loading, createLog, refreshLogs, parseDate } = useCustomerApi();
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenCreate = () => setOpenCreate(true);

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (!customer) return <div>No customer found</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Master customer={customer} parseDate={parseDate} />
      <ActionsHeader onCreateClick={handleOpenCreate} />
      <Detail
        logs={logs}
        customerId={customer.id}
        createLog={createLog}
        refreshLogs={refreshLogs}
        parseDate={parseDate}
        openCreate={openCreate}
        onCloseCreate={() => setOpenCreate(false)}
      />
    </Box>
  );
}   