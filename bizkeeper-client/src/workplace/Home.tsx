import React from 'react';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <Typography variant="h5" color="textSecondary">
        Home feature is coming soon
      </Typography>
    </Box>
  );
};

export default Home;

