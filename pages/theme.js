import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Theme() {
  const [theme, setTheme] = useState("");
  const router = useRouter();
  const { selectedUserValues, selectedUserLabels } = router.query;

  const sendNumber = () => {
    axios.get('/api/sendMessage', {
      params: {
        users: selectedUserValues
      },
    })
      .then(res => setTheme(res.data))
      .catch(error => console.error(error))
  };

  const getTheme = () => {
    axios.get('/api/getRandomTheme')
      .then(res => setTheme(res.data))
      .catch(error => console.error(error))
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <Container maxWidth="sm" className="container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">{theme}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Button variant="contained" onClick={getTheme}>
          新しいお題
        </Button>
        <Button variant="contained" onClick={sendNumber}>
          数字を配る
        </Button>
        <Link href="/">
          <Button variant="contained">
            戻る
          </Button>
        </Link>
      </Box>
    </Container>
  );
}