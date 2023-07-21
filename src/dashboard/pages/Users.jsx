import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { UseGetUser } from "../../hooks/useApi";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSwitch from "../components/AdminSwitch";
import Blocks from "../components/Blocks";
import { useSnackbar } from "notistack";

const Users = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { users, loading  ,setUsers} = UseGetUser();
  const [searchList, setSearchList] = useState([]);
  const [autoList, setAutoList] = useState([]);
  const [value, setValue] = useState(null);
  

  const [inputValue, setInputValue] = useState({ phone: "" });
  useEffect(() => {
    const list = [];
    if (users) {
      setSearchList(users);
      users.map((user) => {
        list.push({ label: user.phone });
        return list;
      });
    }
    setAutoList(list);
  }, [users]);

  const searchForUser = async () => {
    await axios.get(`/user/search_by_phone/${inputValue.phone}`).then((res) => {
      const list = [];
      if (res.data?.user) {
        list.push(res.data.user);
        setSearchList(list);
      } else {
      }
    });
  };
  useEffect(() => {
    if (inputValue.phone !== "") {
      searchForUser();
    } else {
      setSearchList(users);
    }
  }, [inputValue]);
  const moreDetails = (id) => {
    navigate(`/dashboard/users/${id}`);
  };
  const deleteUser = async (id) => {
    console.log(id)
    closeSnackbar();
    await axios.delete(`/user/${id}`).then((res) => {
      if (res.data.status === 200) {
        enqueueSnackbar(`${res.data.message}`, { variant: "success" });
        getAllUsers()
      } else {
        enqueueSnackbar(`${res.data.message}`, { variant: "error" });
      }
    });
  };
  const getAllUsers = async ()=>{
    await axios.get("/user/all_users").then((res) => {
      setUsers(res.data.data)
    });

  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={autoList}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Search By Phone" />
              )}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue.phone}
              onInputChange={(event, newInputValue) => {
                setInputValue({ phone: newInputValue });
              }}
              inputMode="search"
            />
          </Box>
          <Container>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ textTransform: "capitalize" }}>
                    <TableCell>name</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>phone</TableCell>
                    <TableCell>admin</TableCell>
                    <TableCell align="center">action</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchList.map((x) => (
                    <TableRow key={x.phone}>
                      <TableCell>{x.user_name} </TableCell>
                      <TableCell>{x.user_email} </TableCell>
                      <TableCell>{x.phone} </TableCell>
                      <TableCell>
                        <AdminSwitch data={x} />
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          gap={2}
                          alignItems={"center"}
                        >
                          <Blocks data={x} />
                          <Button
                            onClick={() => {
                              deleteUser(x._id);
                            }}
                            variant="contained"
                            color="error"
                            startIcon={<Delete />}
                          >
                            Delete
                          </Button>
                        </Box>
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
          </Container>
        </>
      )}
    </>
  );
};

export default Users;
