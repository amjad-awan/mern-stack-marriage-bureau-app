import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { Buffer } from "buffer";
import "./style.css";
import { Link } from "react-router-dom";
const GroomCard = ({ data }) => {
  const [lookingFor, setLookingFor] = useState();
  console.log("lookingFor", lookingFor);

  const base64String =data?.photo?.data?Buffer.from(data.photo.data).toString("base64"):"";

  // Construct the data URL for the image
  const imageUrl = data?.photo?.contentType?`data:${data.photo.contentType};base64,${base64String}`:"";
  return (
    <Card
      style={{
        //   width: '18rem',
        marginBottom: "25px",
        overflow: "hidden",
      }}
    >
      <img alt="Sample" src={imageUrl} className="groom-img" />
      <CardBody>
        <CardTitle tag="h5" className="mb-3">
          Groom info:
        </CardTitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          Name: <span className="info"> {data.name}</span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          Age: <span className="info"> {data.age} y</span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          Height: <span className="info"> {data.height} ft</span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          City: <span className="info"> {data.city}</span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          Sect: <span className="info">{data.sect} </span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          Education: <span className="info">{data.qualification ?data.qualification:"Not mentioned"} </span>
        </CardSubtitle>
        {lookingFor === data._id && (
          <>
            <p className="looking-for">Looking for</p>
            <CardSubtitle className=" text-muted text-wrapper" tag="h6">
              Age:{" "}
              <span className="info"> {data.requirements.requiredAge} y</span>
            </CardSubtitle>
            <CardSubtitle className=" text-muted text-wrapper" tag="h6">
              Height:{" "}
              <span className="info">{data.requirements.requiredHeight}</span>
            </CardSubtitle>
            <CardSubtitle className=" text-muted text-wrapper" tag="h6">
              Sect: {data.requirements.requiredSect}
            </CardSubtitle>
            <CardSubtitle className=" text-muted text-wrapper" tag="h6">
              Cast:{" "}
              <span className="info">{data.requirements.requiredCast} </span>
            </CardSubtitle>
            <CardSubtitle className=" text-muted text-wrapper" tag="h6">
              Qualification :{" "}
              <span className="info">
                {" "}
                {data.requirements.requiredQualification}{" "}
              </span>
            </CardSubtitle>
          </>
        )}

        {/* <Button className='looking-for-btn' color='primary'>
      
      </Button> */}
        <span
          className="look-for"
          onClick={() => {
            setLookingFor(data._id === lookingFor ? "" : data._id);
          }}
        >
          {lookingFor ? "Hide" : "      Looking for          "}
        </span>
        <Link to={`/${data._id}`}>Details</Link>
      </CardBody>
    </Card>
  );
};

export default GroomCard;
