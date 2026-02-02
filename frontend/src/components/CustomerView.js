// src/components/CustomerView.js
import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Master from './Master';
import Detail from './Detail';
import ActionsHeader from './ActionsHeader';
import { useCustomerApi } from '../hooks/useCustomerApi';

export default function CustomerView() {
  const {
    customer,
    logs,
    loading,
    createLog,
    refreshLogs,
    parseDate,
  } = useCustomerApi();

  const [currentCustomer, setCurrentCustomer] = useState(customer);

  // Sync state when customer loads
  React.useEffect(() => {
    if (customer) setCurrentCustomer(customer);
  }, [customer]);

  const handleCustomerUpdate = (updatedCustomer) => {
    setCurrentCustomer(updatedCustomer);
  };

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (!currentCustomer) return <div>No customer found</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Master customer={currentCustomer} parseDate={parseDate} />
      <ActionsHeader
        customerId={currentCustomer.id}
        createLog={createLog}
        onCustomerUpdate={handleCustomerUpdate}
      />
      <Detail logs={logs} refreshLogs={refreshLogs} parseDate={parseDate} />
    </Box>
  );
}   