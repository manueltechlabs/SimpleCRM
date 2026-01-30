// Master.js
import React, { useEffect } from 'react';
import { Card, Typography } from '@mui/material';

export default function Master({ customer, parseDate }) {
  // Perform logging using useEffect to avoid JSX errors
  useEffect(() => {
    console.log("Customer createdAt:", customer.createdAt);
    if (customer.createdAt) {
      console.log("Parsed date:", parseDate(customer.createdAt).toLocaleDateString());
    }
  }, [customer.createdAt, parseDate]);

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5">{customer.name}</Typography>
      <Typography>Email: {customer.email}</Typography>
      <Typography>Phone: {customer.phone}</Typography>
      <Typography>Address: {customer.address}</Typography>
      <Typography>
        Created: {customer.createdAt ? parseDate(customer.createdAt)?.toLocaleDateString() : 'Invalid Date'}
      </Typography>   
    </Card>
  );
}   