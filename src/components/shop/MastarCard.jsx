import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Store } from "../../context/DataStore";
import { useSnackbar } from "notistack";

const MastarCard = ({ item }) => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { addToCart, cartItems } = Store();
  const fintItem = cartItems.find((x) => x._id === item._id);
  const [quantity, setQuantity] = useState(fintItem?.quantity? fintItem?.quantity:1);

  // https://i.pinimg.com/564x/7c/8e/43/7c8e435c87006f0c48b01071b8e8c0bc.jpg
  const quantityValue = (opp) => {
    if (opp === "add") {
      if (quantity > item.stocke) {
        enqueueSnackbar(`max quantity is ${item.stocke}`);
        setQuantity(item.stocke);
      } else {
        setQuantity( +quantity+1);
      }
    } else {
      if (quantity < 1) {
        setQuantity(1);
        enqueueSnackbar(`Min quantity is 1`);
      } else {
        setQuantity(+quantity-1);
      }
    }
  };
  useEffect(() => {
    if (fintItem && quantity!== fintItem.quantity) {
      addToCart(item, quantity);
    }
  }, [quantity]);

  return (
    <Box my={1}>
      <Container>
        <Card sx={{ p: "20px" }}>
          <Typography
            component={"h6"}
            variant="h5"
            textTransform={"capitalize"}
            py={2}
          >
            {item.title}
          </Typography>
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <CardMedia
                component={"img"}
                src='https://i.pinimg.com/564x/7c/8e/43/7c8e435c87006f0c48b01071b8e8c0bc.jpg'
                sx={{ width: "100% " }}
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <List>
                <ListItem>
                  <Typography>
              {item.descrption}

                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <ListItem>
                  <Grid item xs={12}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{item.price}</Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid item xs={12}>
                    <Typography>statue</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{item.stuate}</Typography>
                  </Grid>
                </ListItem>
                <ListItem>                  
                  <Box
                    display={"flex"}
                    justifyContent={""}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Button
                      color="primary"
                      disabled={quantity > item.stocke}
                      endIcon={<Add />}
                      onClick={() => {
                        quantityValue("add");
                      }}
                    ></Button>
                    <TextField
                      value={ quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      size="small"
                      sx={{
                        width: "70px",
                      }}
                    />
                    <Button
                      disabled={quantity === 1}
                      color="error"
                      endIcon={<Remove />}
                      onClick={() => {
                        quantityValue("remove");
                      }}
                    ></Button>
                  </Box>
                </ListItem>
                <ListItem>
                  <Button
                    startIcon={<ShoppingCart />}
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      addToCart(item, quantity);
                    }}
                    disabled={item.stocke < 1}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default MastarCard;
