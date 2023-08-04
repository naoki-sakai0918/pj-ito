import { useState } from "react";
import { Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export default function LifePoints() {
  const [lifePoints, setLifePoints] = useState(3);

  const handleDecreaseLife = () => {
    if (lifePoints > 0) {
      setLifePoints(prevLifePoints => prevLifePoints - 1);
    }
  };

  const handleIncreaseLife = () => {
    if (lifePoints < 3) {
      setLifePoints(prevLifePoints => prevLifePoints + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <IconButton onClick={handleDecreaseLife}>
        <ArrowLeftIcon />
      </IconButton>
      {[...Array(3)].map((_, index) => (
        <FavoriteIcon key={index} color={index < lifePoints ? "error" : "disabled"} />
      ))}
      <IconButton onClick={handleIncreaseLife}>
        <ArrowRightIcon />
      </IconButton>
    </Box>
  );
}
