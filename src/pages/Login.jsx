import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Store } from "../context/DataStore";

const Login = () => {
  const {setUserInfo} = Store()
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const validationSchema = yup.object({
    password: yup
      .string("Enter Password")
      .min(6)
      .required("Enter Password is required"),
    user_email: yup
      .string("Enter  email")
      .email()
      .required(" Email is required"),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      user_email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await axios.post("/user/sign_in", values).then((res) => {
        if (res.data.message === "login successful") {
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          setUserInfo(res.data.data)
          enqueueSnackbar(`wellcome ${res.data.data.user_name}`, {
            variant: "success",
          });
          if (res.data.data._isAdmin) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        } else {
          enqueueSnackbar(`${res.data.message}`, { variant: "error" });
        }
      });
    },
  });

  return (
    <Box>
      <Container
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <form
          style={{ width: "100%", maxWidth: "600px" }}
          onSubmit={formik.handleSubmit}
        >
          <Card>
            <List sx={{ width: "100%" }}>
              <ListItem>
                <TextField
                  label="Email"
                  inputProps={{ type: "email" }}
                  name="user_email"
                  fullWidth
                  onChange={formik.handleChange}
                  error={
                    formik.touched.user_email &&
                    Boolean(formik.errors.user_email)
                  }
                  helperText={
                    formik.touched.user_email && formik.errors.user_email
                  }
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Password"
                  inputProps={{ type: "password" }}
                  name="password"
                  fullWidth
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" type="submit">
                  Log in
                </Button>
              </ListItem>
              <ListItem>
                <p>
                  I Don't Have Accout /
                  <Link to={"/register"}>
                    <Typography color={"#6dc394"} component={"span"}>
                      Register
                    </Typography>
                  </Link>
                </p>
              </ListItem>
            </List>
          </Card>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
