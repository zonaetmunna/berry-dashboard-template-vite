import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Stack, Button } from '@mui/material';

const dummyReports = [
  { id: 1, name: 'User Activity', date: '2025-08-01', status: 'Completed' },
  { id: 2, name: 'System Health', date: '2025-07-28', status: 'In Progress' },
  { id: 3, name: 'Error Logs', date: '2025-07-25', status: 'Completed' }
];

const Reports = () => (
  <MainCard title="Reports">
    <Box mb={2}>
      <Typography variant="body1" color="textSecondary">
        View admin reports here. Download or review system and user activity reports.
      </Typography>
    </Box>
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Report Name</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.name}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <Chip label={report.status} color={report.status === 'Completed' ? 'success' : 'warning'} size="small" />
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button size="small" variant="outlined" color="primary">View</Button>
                  <Button size="small" variant="outlined" color="secondary">Download</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </MainCard>
);

export default Reports;
