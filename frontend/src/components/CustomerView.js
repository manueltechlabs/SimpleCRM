// CustomerView.js
import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Master from './Master';
import Detail from './Detail';

export default function CustomerView() {
  const [customer, setCustomer] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshLogs = async () => {
    const logsRes = await fetch(`http://127.0.0.1:8080/customers/${customer.id}/logs`);
    const logsData = await logsRes.json();
    setLogs(logsData);
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    try {
      // Convert microseconds (6 digits) to milliseconds (3 digits)
      const isoString = dateString.replace(/\.\d{6,}/, (match) => {
        return match.slice(0, 4); // Keep only first 3 digits after decimal
      });
      const date = new Date(isoString);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.error('Date parsing error:', error);
      return null;
    }
  };   

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchCustomerAndLogs = async () => {
      try {
        // Fetch latest customer
        const customerRes = await fetch("http://127.0.0.1:8080/customers/latest", { 
          signal: controller.signal 
        });
        
        if (!customerRes.ok) throw new Error("Customer not found");
        
        const customerData = await customerRes.json();
        
        // Fetch customer logs
        const logsRes = await fetch(`http://127.0.0.1:8080/customers/${customerData.id}/logs`, {
          signal: controller.signal
        });
        
        if (!logsRes.ok) throw new Error("Logs not found");
        
        const logsData = await logsRes.json();
        
        if (mounted) {
          setCustomer(customerData);
          setLogs(logsData);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          if (mounted) setError(err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCustomerAndLogs();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!customer) return <Typography>No customer found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Master
        customer={customer}
        parseDate={parseDate}
      />
      <Detail 
        logs={logs}
        customerId={customer.id}
        refreshLogs={refreshLogs}
        parseDate={parseDate}
      />
    </Box>
  );
}