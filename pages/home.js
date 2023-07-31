import { useState, useEffect } from 'react';
import UserSelect from './userSelect';
import axios from 'axios';
import { Container, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('/api/getUsers')
      .then(res => {
        const renamedUsers = res.data.map(user => ({
          value: user.id,
          label: user.name,
        }));
        setUsers(renamedUsers);
      })
      .catch(error => console.error(error));
  }, []);

  const [selectedUsers, setSelectedUsers] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleUserChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };

  const router = useRouter();

  const handleStartClick = () => {
    if (selectedUsers) {
      setConfirmationDialogOpen(true);
    }
  };

  const handleConfirmationOk = () => {
    setConfirmationDialogOpen(false);
    if (selectedUsers) {
      const selectedUserValues = selectedUsers.map(user => user.value);
      const selectedUserLabels = selectedUsers.map(user => user.label);
      router.push({
        pathname: '/theme',
        query: {
          selectedUserValues: JSON.stringify(selectedUserValues),
          selectedUserLabels: JSON.stringify(selectedUserLabels),
        },
      });
    }
  };

  return (
    <Container maxWidth="sm" className="container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#2196f3' }}>ito風カードゲーム</Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Box sx={{ minWidth: 180 }}>
          <UserSelect users={users} onChange={handleUserChange} />
        </Box>
      </Box>
      <Box mt={2}>
        <Button variant="contained" onClick={handleStartClick} disabled={!selectedUsers || selectedUsers.length === 0} sx={{ backgroundColor: '#2196f3', color: '#fff' }}>
          はじめる！
        </Button>
      </Box>

      <Dialog open={isConfirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
        <DialogTitle>このメンバーでゲームを始めますか？</DialogTitle>
        <DialogContent>
          {selectedUsers && selectedUsers.map(user => (
            <Typography key={user.value} sx={{ fontSize: 18 }}>{user.label}</Typography>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingTop: '16px' }}>
          <Button
            onClick={handleConfirmationOk}
            sx={{
              backgroundColor: '#2196f3',
              color: '#fff',
              marginRight: '8px',
              '&:hover': {
                backgroundColor: '#1976d2', // マウスオーバー時の背景色
              },
            }}
          >
            はじめる！
          </Button>
          <Button
            onClick={() => setConfirmationDialogOpen(false)}
            sx={{
              color: '#2196f3',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.04)', // マウスオーバー時の背景色
              },
            }}
          >
            選びなおす
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
