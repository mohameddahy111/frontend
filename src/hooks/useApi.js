import axios from "axios";
import { useEffect, useState } from "react";

export const UseGetUser = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  async function allUser() {
    return await axios.get("/user/all_users");
  }
  useEffect(()=>{
    allUser().then((res)=>{
      setUsers(res.data.data)
      setLoading(false)
      setErr(null)

    }).catch((err)=>{
      setErr(err)
      setLoading(false)
    })
  },[])
  return {err , users , loading , setUsers}
};
export const UseGetDetails = (id) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [err, setErr] = useState(null);

  async function userDetails() {
    return await axios.get(`/user/${id}`);
  }
  useEffect(()=>{
    userDetails().then((res)=>{
      setDetails(res.data.user)
      setLoading(false)
      setErr(null)

    }).catch((err)=>{
      setErr(err)
      setLoading(false)
    })
  },[])
  return {err , details , loading , }
};


