import { Block, ReplayOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { UseGetUser } from "../../hooks/useApi";

const Blocks = ({ data }) => {
  const { setUsers  } = UseGetUser();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isBlock, setIsBlock] = useState(data.isBlocked);
  const blockUser = async (id) => {
    closeSnackbar();
    await axios
      .patch(`/user/block/${id}`, { isBlock: !isBlock })
      .then((res) => {
        if (res.data.status === 200) {
          if (res.data.isBlock === true) {
            enqueueSnackbar(`${res.data.message}`, { variant: "warning" });
          } else {
            enqueueSnackbar(` user UnBlocked `, { variant: "success" });
          }
          setIsBlock(!isBlock);
        } else {
          enqueueSnackbar(`${res.data.message}`, { variant: "error" });
        }
      });
  };

  return (
    <>
      {isBlock === true ? (
        <Button
          sx={{ color: "#208080" }}
          startIcon={<ReplayOutlined />}
          onClick={() => blockUser(data._id)}
        >
          unblock
        </Button>
      ) : (
        <Button
          sx={{ color: "#000" }}
          startIcon={<Block />}
          onClick={() => blockUser(data._id)}
        >
          block
        </Button>
      )}
    </>
  );
};

export default Blocks;
