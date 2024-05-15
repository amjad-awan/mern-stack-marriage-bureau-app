import React, { useEffect, useState } from "react";
import { getSingleGroom } from "../../ServerRequests/groomRequest";
import { useParams } from "react-router-dom";
import SingleGroomWrapper from "../../components/SingleGroomWrapper/SingleGroomWrapper";

const GroomDetailPage = () => {

  return <SingleGroomWrapper />;
};

export default GroomDetailPage;
