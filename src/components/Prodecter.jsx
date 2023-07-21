import React, { useEffect } from "react";
import { Store } from "../context/DataStore";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Prodecter = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = Store();
  const navigate = useNavigate();
  useEffect(() => {
    closeSnackbar()
    if (userInfo?._isAdmin) {
      
        navigate("/dashboard");
    }else{
      enqueueSnackbar("You are not Admin", { variant: "error" });
     return navigate("/");
    }
  }, [userInfo]);  

  return( 
  <>
  {children}
 
  </>
  );
};

export default Prodecter;
