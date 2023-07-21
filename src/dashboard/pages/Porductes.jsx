import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Edit } from "@mui/icons-material";

const AddProduets = () => {
  const navigate = useNavigate();
  const [productes, setProductes] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllProduct = async () => {
    await axios.get("/products").then((res) => {
      setProductes(res.data.product);
      setLoading(false);
    });
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  const moreDetails = (id) => {
navigate(`/dashboard/product/${id}`)
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Box>
            <Button
              onClick={() => {
                navigate("/dashboard/add_porducte");
              }}
            >
              Add New product
            </Button>
          </Box>
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ textTransform: "capitalize" }}>
                    <TableCell>title</TableCell>
                    <TableCell>stuate</TableCell>
                    <TableCell>create_By</TableCell>
                    <TableCell>category</TableCell>
                    <TableCell align="center">action</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productes.map((x) => (
                    <TableRow key={x._id}>
                      <TableCell>{x.title} </TableCell>
                      <TableCell>{x.stuate} </TableCell>
                      <TableCell>{x.create_By?.user_name}</TableCell>
                      <TableCell> {x.category} </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            navigate("/dashboard/add_porducte" , {state :x});
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => moreDetails(x._id)}>
                          more details
                        </Button>{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      )}
    </>
  );
};

export default AddProduets;
