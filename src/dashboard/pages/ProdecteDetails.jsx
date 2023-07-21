import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useSnackbar } from "notistack";

const ProdecteDetails = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [producte, setProducte] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const getProdcteDetails = async () => {
    await axios.get(`/product/${params.id}`).then((res) => {
      if (res.data.status === 200) {
        setProducte(res.data.producte);
      } else {
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    }).finally(()=>{
      setLoading(false);
    });
  };
  useEffect(() => {
    getProdcteDetails();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!producte ? (
            <Typography>This product is not available</Typography>
          ) : (
            <>hiii</>
          )}
        </>
      )}
    </>
  );
};

export default ProdecteDetails;
