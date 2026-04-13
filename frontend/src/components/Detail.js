// src/components/Detail.js
import React, { useMemo, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';   
import DeleteIcon from '@mui/icons-material/Delete';
import ViewLogModal from './ViewLogModal';
import DeleteInteractionLogModal from './DeleteInteractionLogModal';
import AnswerModal from './AnswerModal';

export default function Detail({ logs, refreshLogs, parseDate }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [deleteLog, setDeleteLog] = useState(null);
  const [answerModal, setAnswerModal] = useState({ open: false, message: '' });

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:8080/logs/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Delete failed');
    }

    // Show generic success message
    setAnswerModal({ open: true, message: 'Log deleted successfully' });
    refreshLogs();
    setDeleteLog(null);
  } catch (error) {
    setAnswerModal({ 
      open: true, 
      message: 'Failed to delete log. Please try again.' 
    });
  }
};   

  const columns = useMemo(() => [
    { field: 'interactionType', headerName: 'Type', width: 120 },
    { field: 'subject', headerName: 'Subject', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 180,
      valueGetter: (value) => {
        const date = parseDate(value);
        return date ? date.toLocaleString() : '';
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => setDeleteLog(params.row)}
          color="error"
        />,
      ],
    },
  ], [parseDate]);

  return (
    <Box sx={{ flex: 1 }}>
      <DataGrid
        rows={logs || []}
        columns={columns}
        onRowClick={(params) => setSelectedLog(params.row)}
        autoHeight
        pageSize={10}
        disableColumnSelector
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />
      <ViewLogModal
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
        parseDate={parseDate}
      />
      <DeleteInteractionLogModal
        open={!!deleteLog}
        onClose={() => setDeleteLog(null)}
        log={deleteLog}
        onConfirm={handleDelete}
      />
      <AnswerModal
      open={answerModal.open}
      onClose={() => {
        setAnswerModal({ open: false, message: '' });
        setDeleteLog(null);
      }}
      message={answerModal.message}
    />
    </Box>
  );
}