
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Typography, Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';

const initialRoles = [
  { id: 1, name: 'Admin', permissions: ['All Access'], users: 2 },
  { id: 2, name: 'Editor', permissions: ['Edit Content', 'Publish'], users: 5 },
  { id: 3, name: 'Viewer', permissions: ['Read Only'], users: 12 }
];

const allPermissions = [
  'All Access',
  'Edit Content',
  'Publish',
  'Read Only',
  'Delete Content',
  'Manage Users'
];

const Roles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ name: '', permissions: [] });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const handleOpenAdd = () => {
    setDialogMode('add');
    setForm({ name: '', permissions: [] });
    setOpenDialog(true);
  };

  const handleOpenEdit = (role) => {
    setDialogMode('edit');
    setSelectedRole(role);
    setForm({ name: role.name, permissions: role.permissions });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRole(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePermissionsChange = (e) => {
    setForm({ ...form, permissions: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value });
  };

  const handleDialogSubmit = () => {
    if (dialogMode === 'add') {
      setRoles([
        ...roles,
        { id: Date.now(), ...form, users: 0 }
      ]);
    } else if (dialogMode === 'edit' && selectedRole) {
      setRoles(roles.map(r => r.id === selectedRole.id ? { ...selectedRole, ...form } : r));
    }
    setOpenDialog(false);
    setSelectedRole(null);
  };

  const handleOpenDelete = (role) => {
    setRoleToDelete(role);
    setDeleteDialog(true);
  };

  const handleDelete = () => {
    setRoles(roles.filter(r => r.id !== roleToDelete.id));
    setDeleteDialog(false);
    setRoleToDelete(null);
  };

  return (
    <MainCard title="Roles & Permissions">
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary">
          Manage roles and permissions here. You can add, edit, or remove roles and assign permissions to users.
        </Typography>
      </Box>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>Add Role</Button>
        <Button variant="outlined" color="secondary">Manage Permissions</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Role Name</b></TableCell>
              <TableCell><b>Permissions</b></TableCell>
              <TableCell align="center"><b>Users</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.map((perm, idx) => (
                    <Chip key={idx} label={perm} size="small" color="info" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell align="center">{role.users}</TableCell>
                <TableCell align="center">
                  <Button size="small" variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleOpenEdit(role)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleOpenDelete(role)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Add Role' : 'Edit Role'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Role Name" name="name" value={form.name} onChange={handleFormChange} fullWidth />
            <TextField
              select
              label="Permissions"
              name="permissions"
              value={form.permissions}
              onChange={handlePermissionsChange}
              fullWidth
              SelectProps={{ multiple: true }}
              helperText="Select one or more permissions"
            >
              {allPermissions.map((perm) => (
                <MenuItem key={perm} value={perm}>{perm}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSubmit} variant="contained" color="primary">{dialogMode === 'add' ? 'Add' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} maxWidth="xs">
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <b>{roleToDelete?.name}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Roles;
