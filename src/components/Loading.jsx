import { Box } from '@mui/material';
import React from 'react';
import { Triangle } from  'react-loader-spinner'

const Loading = () => {
  return (
    <Box display={'flex'} justifyContent={'center'}  alignItems={'center'} width={"100%"} height={'100vh'} >
      <Triangle
  height="400"
  width="400"
  color="#afd9f5"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
  
/>
      
    </Box>
  );
}

export default Loading;
