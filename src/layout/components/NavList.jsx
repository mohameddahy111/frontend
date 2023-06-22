import { Box, List, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Store } from "../../context/DataStore";
import UserList from "./UserList";

const NavList = () => {
  const { mobileDrive } = Store();
  const list = [
    {
      title: "HOME",
      link: "/",
      color: "#6ccfad",
    },
    {
      title: "SHOP",
      link: "/shop",
    },
    {
      title: "CONTACT US",
      link: "/contact",
    },
    {
      title: "BLOG",
      link: "/blog",
    },
    {
      title: "ABOUT US",
      link: "/about",
    },
  ];
  return (
    <Box>
      <List
        sx={
          !mobileDrive
            ? {
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "20px",
              }
            : {
                p: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }
        }
      >
        {list.map((item, index) => (
          <ListItemText key={index}>
            <Link to={item.link}>
              <Typography
                color={item.color}
                sx={{
                  ":hover": {
                    color: "#6ccfad",
                    transition: "all .4s ",
                  },
                }}
              >
                {item.title}
              </Typography>
            </Link>
          </ListItemText>
        ))}
        {mobileDrive && <UserList  />}
      </List>
    </Box>
  );
};

export default NavList;
