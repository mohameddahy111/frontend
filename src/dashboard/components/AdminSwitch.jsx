import { Switch } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const AdminSwitch = ({ data }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [admin, setAdmin] = useState(data._isAdmin);
  const updateUser = () => {
    let newVal = admin === true ? false : true;
    setAdmin(newVal);
    switchAdmin(newVal);
  };
  const switchAdmin = async (val) => {
    await axios.patch(`/user/${data._id}`, { admin: val }).then((res) => {
      closeSnackbar();
      if (res.data.admin === true) {
        enqueueSnackbar(`${data.user_name} become admin`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(`${data.user_name} remove from  admins`, {
          variant: "error",
        });
      }
    });
  };
  return <Switch checked={admin} onChange={updateUser} />;
};

export default AdminSwitch;
