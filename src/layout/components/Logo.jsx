import { Box, Typography } from '@mui/material';
import React from 'react';
import logo from '../../img/logo.jpg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Box width={160}>
      <Link to={'/'}>
      <img src={logo} alt="ddd" width={80} style={{borderRadius :'10px'}} />
      </Link>
      <Typography fontSize={10}>
      Call Us: +1 (313) 566-4443
      </Typography>
      
    </Box>
  );
}

export default Logo;
