import React from "react";
import { useParams } from "react-router-dom";
import { UseGetDetails } from "../../hooks/useApi";
import Loading from "../../components/Loading";

const UserDetails = () => {
  const params = useParams();
  const { details, loading } = UseGetDetails(params.id);
  console.log(details);

  return <div>{loading ? <Loading /> : <>{details.phone}</>}</div>;
};

export default UserDetails;
