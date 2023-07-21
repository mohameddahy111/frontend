import { AddAPhotoTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Store } from "../../context/DataStore";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";

const AddPorductes = () => {
  const editPorductes = useLocation().state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = Store();
  const validationSchema = yup.object({
    title: yup.string().required(),
    category: yup.string().required(),
    stocke: yup.number(),
    descrption: yup.string().required(),
    price: yup.number().required(),
    stuate: yup.string().required(),
    desconut: yup.number(),
    offer: yup.boolean(),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: editPorductes ? editPorductes.title : "",
      category: editPorductes ? editPorductes.category : "All Categories",
      stocke: editPorductes ? editPorductes.stocke : 0,
      descrption: editPorductes ? editPorductes.descrption : "",
      price: editPorductes ? editPorductes.price : 0,
      stuate: editPorductes ? editPorductes.stuate : "",
      desconut: editPorductes? editPorductes.desconut ===null? "" :editPorductes:'' ,
      offer: editPorductes ? editPorductes.offer : false,
      create_By: userInfo?._id,
      
    },
    onSubmit: async (values) => {
      if (editPorductes) {
        await axios.put("/products/", {_id :editPorductes._id ,values:values}).then((res) => {
          if (res.data.status === 200) {
            enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          } else {
            enqueueSnackbar(`try agin `, { variant: "error" });
          }
        });

      } else {
        await axios.post("/products/", values).then((res) => {
          if (res.data.status === 200) {
            enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          } else {
            enqueueSnackbar(`try agin `, { variant: "error" });
          }
        });
        
      }
    },
  });
  const [defuletImg, setDefuletImg] = useState(
    "https://i.pinimg.com/564x/3e/b5/bd/3eb5bd4b6416cebfcd806281f87c2d2f.jpg"
  );
  const categories = [
    {
      title: "All Categories",
      value: 0,
    },
    {
      title: "Bandages & Tapes",
      value: 1,
    },
    {
      title: "Containers",
      value: 2,
    },
    {
      title: "First Aid Kit",
      value: 3,
    },
    {
      title: "Laboratory",
      value: 5,
    },
    {
      title: "Laboratory Supplies",
      value: 6,
    },
    {
      title: "labware",
      value: 7,
    },
    {
      title: "Medical & Surgical Supplies",
      value: 8,
    },
    {
      title: "Needle & Syringe Combination",
      value: 9,
    },
    {
      title: "new",
      value: 10,
    },
  ];
  useEffect(() => {
    if (!formik.values.offer) {
      formik.values.desconut = "";
    }
  }, [formik.values.offer]);
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} maxWidth={"100%"} wrap="wrap">
          <Grid item md={3} pr={2}>
            <Box position={"relative"}>
              <img src={defuletImg} alt="" width={"100%"} />
              <Box
                position={"absolute"}
                // bgcolor={"#f8f8f8"}
                zIndex={2}
                top={0}
                right={0}
              >
                <Tooltip title={"Add Photo"}>
                  <IconButton
                    sx={{
                      bgcolor: "#aed9f5",
                      ":hover": { bgcolor: "#EEF2F6" },
                    }}
                  >
                    <label htmlFor="image">
                      <AddAPhotoTwoTone sx={{ color: "#09c" }} />
                    </label>
                  </IconButton>
                </Tooltip>
                <input
                  type="file"
                  name="image"
                  id="image"
                  hidden
                  // onChange={(e) => chageValue(e)}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography
              variant="h5"
              component={"h2"}
              textTransform={"capitalize"}
              fontWeight={700}
              p={2}
            >
              Information of product
            </Typography>
            <Divider />
            <List sx={{ width: "100%" }}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <TextField
                  label="Product Name"
                  inputProps={{ type: "text" }}
                  size="small"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <Box>
                  <Select
                    value={formik.values.category}
                    name="category"
                    onChange={formik.handleChange}
                    size="small"
                  >
                    {categories.map((x, index) => (
                      <MenuItem value={x.title} key={index}>
                        {x.title}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <TextField
                  inputProps={{ type: "number" }}
                  label="Stocke"
                  size="small"
                  name="stocke"
                  onChange={formik.handleChange}
                  error={formik.touched.stocke && Boolean(formik.errors.stocke)}
                  helperText={formik.touched.stocke && formik.errors.stocke}
                  value={formik.values.stocke}
                />
                <TextField
                  inputProps={{ type: "number" }}
                  label="Price"
                  size="small"
                  name="price"
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  value={formik.values.price}
                />
              </ListItem>
              <ListItem>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={100}
                >
                  <Typography>Offer</Typography>
                  <Switch
                    name="offer"
                    value={formik.values.offer}
                    onChange={formik.handleChange}
                    title="Offer"
                  />
                </Box>
                <TextField
                  disabled={!formik.values.offer}
                  inputProps={{ type: "number" }}
                  label="Desconut"
                  size="small"
                  name="desconut"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.desconut && Boolean(formik.errors.desconut)
                  }
                  helperText={formik.touched.desconut && formik.errors.desconut}
                  value={formik.values.desconut}
                />
              </ListItem>
              <ListItem>
                <Typography
                  fontWeight={600}
                  textTransform={"capitalize"}
                  component={"h5"}
                >
                  Type description
                </Typography>
              </ListItem>
              <ListItem>
                <textarea
                  rows={10}
                  placeholder=" description ..."
                  style={{ padding: "10px", width: "100%" }}
                  name="descrption"
                  onChange={formik.handleChange}
                  value={formik.values.descrption}
                ></textarea>
              </ListItem>
              <ListItem>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Stuate
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="stuate"
                    onChange={formik.handleChange}
                    value={formik.values.stuate}
                  >
                    <FormControlLabel
                      value="available"
                      control={<Radio />}
                      label="Available"
                    />
                    <FormControlLabel
                      value="unavailable"
                      control={<Radio />}
                      label="Unavailable"
                    />
                    <FormControlLabel
                      value="Bookable"
                      control={<Radio />}
                      label="Bookable"
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
              <ListItem>
                {editPorductes ? (
                  <Box display={'flex'} gap={2}>

                  <Button variant="contained" type="submit">
                    edit
                  </Button>
                  <Button variant="contained"  color="error">
                    delete
                  </Button>
                  </Box>
                  
                ) : (
                  <Button variant="contained" type="submit">
                    Add product
                  </Button>
                )}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddPorductes;
