import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "../css/styles.module.css";
import { Store } from "../context/DataStore";

const MineTitle = ({ title }) => {
  const {mobileDrive} =Store()
  return (
    <Box  p={3}>
      <Typography
        align="center"
        component={"h2"}
        variant={mobileDrive ? "h6" :'h3'}
        fontWeight={700}
        className={styles.Main_title}
        textTransform='capitalize'
      >
        {title}
      </Typography>
    </Box>
  );
};

export default MineTitle;
