// src/components/Detail.js
import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import CreateLogModal from './CreateLogModal';
import ViewLogModal from './ViewLogModal';

export default function Detail({ logs, customerId, createLog, refreshLogs, parseDate }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

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
  ], [parseDate]);

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Interaction History</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>Create Log</Button>
      </Box>

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

      <CreateLogModal
        open={openCreate}
        onClose={handleCloseCreate}
        customerId={customerId}
        createLog={createLog}
      />

      <ViewLogModal
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
        parseDate={parseDate}
      />
    </Box>
  );
}