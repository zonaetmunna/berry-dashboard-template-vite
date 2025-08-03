
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Typography, Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
  { id: 3, name: 'Sam Lee', email: 'sam@example.com', role: 'Viewer', status: 'Active' }
];

const roleOptions = ['Admin', 'Editor', 'Viewer'];
const statusOptions = ['Active', 'Inactive'];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'Viewer', status: 'Active' });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleOpenAdd = () => {
    setDialogMode('add');
    setForm({ name: '', email: '', role: 'Viewer', status: 'Active' });
    setOpenDialog(true);
  };

  const handleOpenEdit = (user) => {
    setDialogMode('edit');
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDialogSubmit = () => {
    if (dialogMode === 'add') {
      setUsers([
        ...users,
        { id: Date.now(), ...form }
      ]);
    } else if (dialogMode === 'edit' && selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...selectedUser, ...form } : u));
    }
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialog(true);
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setDeleteDialog(false);
    setUserToDelete(null);
  };

  return (
    <MainCard title="Users Management">
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary">
          Manage users here. You can add, edit, or remove users and assign roles.
        </Typography>
      </Box>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>Add User</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar>{user.name[0]}</Avatar>
                    <Typography>{user.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip label={user.role} color={user.role === 'Admin' ? 'primary' : user.role === 'Editor' ? 'secondary' : 'default'} size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={user.status} color={user.status === 'Active' ? 'success' : 'default'} size="small" />
                </TableCell>
                <TableCell align="center">
                  <Button size="small" variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleOpenEdit(user)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleOpenDelete(user)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Add User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={form.name} onChange={handleFormChange} fullWidth />
            <TextField label="Email" name="email" value={form.email} onChange={handleFormChange} fullWidth />
            <TextField select label="Role" name="role" value={form.role} onChange={handleFormChange} fullWidth>
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </TextField>
            <TextField select label="Status" name="status" value={form.status} onChange={handleFormChange} fullWidth>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
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
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <b>{userToDelete?.name}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Users;
