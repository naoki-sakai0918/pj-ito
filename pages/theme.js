import React, { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, InputLabel, Typography, Select, MenuItem} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LifePoints from './lifePoints';


export default function Theme() {
  const [theme, setTheme] = useState("");
  const [selectedStage, setSelectedStage] = useState(1);
  const router = useRouter();
  const {selectedUserValues} = router.query;
  
  const sendNumber = () => {
    let generatedNumbers = new Set();
    for (let user of JSON.parse(selectedUserValues)) {
      let message = `ステージ${selectedStage} : お題は「${theme}」\nあなたの数字は`;
      for (let i = 1; i <= selectedStage; i++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * 100) + 1;
        } while (generatedNumbers.has(randomNumber));
        generatedNumbers.add(randomNumber);
        message += randomNumber;
        if (i !== selectedStage) {
          message += ', ';
        }
      }
      message += 'です！';
      axios.get('/api/sendMessage', {
        params: {
          user: user,
          msg: message,
        },
      })
      .catch(error => console.error(error))
    }
  };

  const getTheme = () => {
    axios.get('/api/getRandomTheme')
      .then(res => setTheme(res.data))
      .catch(error => console.error(error))
  };

  const handleChangeStage = (event) => {
    setSelectedStage(event.target.value);
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <Container maxWidth="md" className="container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ mt: 2 }}>
        <LifePoints />
      </Box>
      <Box textAlign="center" my={4}>
        <Typography variant="h4">{theme}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '16px', mb: 2 }}>  
        <FormControl variant="outlined">
          <InputLabel>ステージ</InputLabel>
          <Select
            value={selectedStage}
            onChange={handleChangeStage}
            label='ステージ'
            sx={{ width: '100px' }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
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