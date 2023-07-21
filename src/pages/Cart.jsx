import React from "react";
import { Store } from "../context/DataStore";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Caet = () => {
  const { cartItems, setCartItems } = Store();

  const total = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const taxt = parseFloat(total * 0.14).toFixed(2);
  const totalItems = cartItems.reduce((a, c) => a + c.quantity, 0);

  const deleteItem = (id) => {
    const list = cartItems.filter((x) => x._id !== id);
    setCartItems(list);
    localStorage.setItem("cartItems", JSON.stringify(list));
  };
  return (
    <Box p={5} mt={3}>
      {cartItems.length === 0 ? (
        <Box display={'flex'}justifyContent={"center"} alignItems={"center"} height={"50vh"} >
          <Typography component={"h2"} variant="h4">
            your cart is empty pleace go to <strong style={{color:'#09c'}}>
              <Link to={"/shop"}>Shop </Link></strong> and full
            it
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ textTransform: "capitalize" }}>
                    <TableCell>title</TableCell>
                    <TableCell>quantity</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell>taxt 14%</TableCell>
                    <TableCell align="center">action</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((x) => (
                    <TableRow key={x._id}>
                      <TableCell>
                        <Link to={`/produtes/${x.id}`}>{x.title}</Link>
                      </TableCell>
                      <TableCell>{x.quantity}</TableCell>
                      <TableCell>
                        {parseFloat((x.price * x.quantity).toFixed(2))} $
                      </TableCell>
                      <TableCell>
                        {parseFloat(x.price * x.quantity * 0.14).toFixed(2)} ${" "}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          startIcon={<Delete />}
                          color="error"
                          onClick={() => {
                            deleteItem(x._id);
                          }}
                        >
                          delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <ListItem>
                <Grid item xs={12}>
                  itme(s) :
                </Grid>
                <Grid item xs={12}>
                  ({totalItems} ) item
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={12}>
                  price :{" "}
                </Grid>
                <Grid item xs={12}>
                  {total} $
                </Grid>
              </ListItem>
              <ListItem sx={{ color: "red" }}>
                <Grid item xs={12}>
                  Taxt :{" "}
                </Grid>
                <Grid item xs={12}>
                  {taxt} $
                </Grid>
              </ListItem>

              <Divider>
                <Chip label={"Total"} />
              </Divider>
              <ListItem>
                <Grid item xs={12}>
                  Total
                </Grid>
                <Grid item xs={12}>
                  {parseFloat(total + total * 0.14).toFixed(2)} $
                </Grid>
              </ListItem>
              <ListItem>
                <Button variant="contained" fullWidth>
                  Check out
                </Button>
              </ListItem>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Caet;
