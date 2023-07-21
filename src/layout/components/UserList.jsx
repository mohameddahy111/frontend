import {
  DarkMode,
  LightMode,
  LoginOutlined,
  SearchOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  List,
  ListItem,
  Switch,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Store } from "../../context/DataStore";
import { useNavigate } from "react-router-dom";
import AvatarMune from "./AvatarMune";

const UserList = () => {
  const navigate = useNavigate();
  const { mobileDrive, mode, setMode, cartItems, userInfo } = Store();

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
          checked={mode === "dark" ? true : false}
        />
        <ListItem>
          <Tooltip title={"Cart"}>
            <Badge
              badgeContent={cartItems.length}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              color="error"
            >
              <Button
                startIcon={<ShoppingBagOutlined />}
                sx={{ color: "#6ccfad" }}
                onClick={() => navigate(`/cart`)}
              ></Button>
            </Badge>
          </Tooltip>
        </ListItem>
        <ListItem>
          {userInfo ? (
                <AvatarMune user={userInfo}/>
          ) : (
            <Tooltip
              title={ "Login"}
            >
              <Button
                startIcon={<LoginOutlined />}
                sx={{ color: "#6ccfad" }}
                onClick={() => navigate(`/login`)}
              >
                login
              </Button>
            </Tooltip>
          )}
        </ListItem>
        <ListItem>
        <Button
                startIcon={<SearchOutlined />}
                sx={{ color: "#6ccfad" }}
                onClick={() => navigate(`/search`)}
              >
                search
              </Button>

        </ListItem>
      </List>
    </Box>
  );
};

export default UserList;
