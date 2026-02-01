// src/components/Detail.js
import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CreateLogModal from './CreateLogModal';
import ViewLogModal from './ViewLogModal';

export default function Detail({
  logs,
  customerId,
  createLog,
  refreshLogs,
  parseDate,
  openCreate,
  onCloseCreate,
}) {
  const [selectedLog, setSelectedLog] = useState(null);

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
        onClose={onCloseCreate}
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