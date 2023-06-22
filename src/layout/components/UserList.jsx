import {
  DarkMode,
  LightMode,
  LoginOutlined,
  NightlightRound,
  NightsStay,
  SearchOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Store } from "../../context/DataStore";

const UserList = () => {
  const { mobileDrive, mode, setMode } = Store();

  const list = [
    {
      title: "Search",
      icon: <SearchOutlined />,
    },
    {
      title: " login",
      icon: <LoginOutlined />,
      link: "/login",
    },
    {
      title: "Cart",
      icon: <ShoppingBagOutlined />,
      link: "/cart",
    },
  ];
  const changeMode = () => {
    let newMmode = "";
    if (mode === "dark") {
      newMmode = "light";
    } else {
      newMmode = "dark";
    }
    setMode(newMmode);
    localStorage.setItem("mode", JSON.stringify(newMmode));
  };
  return (
    <Box>
      <List
        sx={
          !mobileDrive
            ? {
                display: "flex",
                alignItems: "center",
                width: "100%",
              }
            : { p: "10px" }
        }
      >
        <Switch
          icon={<DarkMode sx={{ color: "#61a9da" }} />}
          checkedIcon={<LightMode sx={{ color: "#f0c000" }} />}
          onChange={() => changeMode()}
          value={mode}
        checked={mode === "dark" ? true: false}
        />
        {list.map((x, index) => (
          <Tooltip title={x.title} key={index}>
            <ListItem>
              <Button
                startIcon={x.icon}
                sx={!mobileDrive ? { color: "#6ccfad" } : { color: "#000" }}
              >
                {x.title}
              </Button>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
