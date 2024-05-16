import React, { useEffect, useState } from "react";
import { getSingleGroom } from "../../ServerRequests/groomRequest";
import { useParams } from "react-router-dom";
import SingleGroomWrapper from "../../components/SingleGroomWrapper/SingleGroomWrapper";
import NavBar from "../../components/NavBar/NavBar";

const GroomDetailPage = () => {

  return <>
<NavBar/>
<SingleGroomWrapper />
  </>
}

export default GroomDetailPage;
