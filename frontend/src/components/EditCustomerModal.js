// src/components/EditCustomerModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';

export default function EditCustomerModal({ open, onClose, customerId, onCustomerUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && customerId) {
      // Fetch current customer data
      fetch(`http://127.0.0.1:8080/customers/${customerId}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((err) => console.error('Failed to fetch customer:', err));
    }
  }, [open, customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8080/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        onCustomerUpdate(updated); // Notify parent
        onClose();
      } else {
        alert('Failed to update customer');
      }
    } catch (err) {
      console.error('Error updating customer:', err);
      alert('Error updating customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={!loading ? onClose : undefined}>
      <Box sx={{
        p: 4,
        bgcolor: 'background.paper',
        margin: '5% auto',
        width: { xs: '90%', sm: 500 },
      }}>
        <Typography variant="h6" gutterBottom>Edit Customer</Typography>
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          value={formData.phone}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          value={formData.address}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />
        <Divider sx={{ mb: 2 }} />
        <Button onClick={onClose} disabled={loading} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating...' : 'Update Customer'}
        </Button>
      </Box>
    </Modal>
  );
}   