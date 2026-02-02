// src/hooks/useCustomerApi.js
import { useState, useEffect, useCallback } from 'react';

export const useCustomerApi = () => {
  const [customer, setCustomer] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    try {
      const isoString = dateString.replace(/\.\d{6,}/, (match) => match.slice(0, 4));
      const date = new Date(isoString);
      return isNaN(date.getTime()) ? null : date;
    } catch (err) {
      console.error('Date parsing error:', err);
      return null;
    }
  };

  const fetchCustomer = useCallback(async () => {
    try {
      const res = await fetch('http://127.0.0.1:8080/customers/latest');
      if (!res.ok) throw new Error('Failed to fetch customer');
      const data = await res.json();
      setCustomer(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchLogs = useCallback(async (customerId) => {
    if (!customerId) return;
    try {
      const res = await fetch(`http://127.0.0.1:8080/customers/${customerId}/logs`);
      if (!res.ok) throw new Error('Failed to fetch logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const createLog = useCallback(async (customerId, logData) => {
    await fetch(`http://127.0.0.1:8080/customers/${customerId}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData),
    });
    await fetchLogs(customerId);
  }, [fetchLogs]);

  const updateCustomer = useCallback(async (id, updatedData) => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/customers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        const updated = await res.json();
        setCustomer(updated);
        return updated;
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
    return null;
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      const cust = await fetchCustomer();
      if (isMounted && cust) await fetchLogs(cust.id);
      setLoading(false);
    };
    load();
    return () => (isMounted = false);
  }, [fetchCustomer, fetchLogs]);

  return {
    customer,
    logs,
    loading,
    error,
    refreshLogs: () => customer && fetchLogs(customer.id),
    createLog,
    updateCustomer,
    parseDate,
  };
};   