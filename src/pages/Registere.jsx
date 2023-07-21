import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const validationSchema = yup.object({
    user_name: yup
      .string("Enter User name")
      .min(3)
      .required("User Name is required"),
    user_email: yup
      .string("Enter  email")
      .email()
      .required(" Email is required"),
    phone: yup
      .number("Enter User phone")
      .min(12)

      .required("User Phone is required"),
    password: yup
      .string("Enter Password")
      .min(6)
      .required("Enter Password is required"),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      user_name: "",
      user_email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (values.confirmPassword === values.password) {
        await axios
        .post("/user/sign_up",values)
        .then((res) => {
          if (res.data.status === 200) {
            enqueueSnackbar(`${res.data.message}` , {variant:"success"});
            navigate('/login');
          } else {
            console.log(res)
            enqueueSnackbar(`${res.data.message}`,{variant :'error'});
          }
        });

      } else {
        enqueueSnackbar('password is incorrect' , {variant :'error'});
      }
    },
  });

  return (
    <Box mt={5}>
      <Container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: "60%" }}>
          <List sx={{ width: "100%" }}>
            <ListItem>
              <TextField
                fullWidth
                name="user_name"
                label="User Name"
                inputProps={{ type: "text" }}
                value={formik.values.user_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.user_name && Boolean(formik.errors.user_name)
                }
                helperText={formik.touched.user_name && formik.errors.user_name}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                name="user_email"
                label="E-mail"
                inputProps={{ type: "email" }}
                value={formik.values.user_email}
                onChange={formik.handleChange}
                error={
                  formik.touched.user_email && Boolean(formik.errors.user_email)
                }
                helperText={
                  formik.touched.user_email && formik.errors.user_email
                }
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                inputProps={{ type: "text" }}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                name="password"
                label="password "
                inputProps={{ type: "password" }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                sx={{ mx: "5px" }}
                fullWidth
                name="confirmPassword"
                label="password "
                inputProps={{ type: "password" }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </ListItem>

            <ListItem>
              <Button type=" submit">Register</Button>
            </ListItem>
          </List>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
