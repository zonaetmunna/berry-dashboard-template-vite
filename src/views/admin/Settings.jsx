import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, Box, Button, Stack, TextField, Switch, FormControlLabel, Divider } from '@mui/material';

const Settings = () => (
  <MainCard title="Settings">
    <Box mb={2}>
      <Typography variant="body1" color="textSecondary">
        Manage admin settings here. Update preferences and configuration for your admin panel.
      </Typography>
    </Box>
    <Divider sx={{ mb: 2 }} />
    <Stack spacing={3} maxWidth={400}>
      <TextField label="Site Title" defaultValue="Admin Panel" fullWidth />
      <TextField label="Support Email" defaultValue="support@example.com" fullWidth />
      <FormControlLabel control={<Switch defaultChecked />} label="Enable Notifications" />
      <FormControlLabel control={<Switch />} label="Maintenance Mode" />
      <Button variant="contained" color="primary">Save Settings</Button>
    </Stack>
  </MainCard>
);

export default Settings;
