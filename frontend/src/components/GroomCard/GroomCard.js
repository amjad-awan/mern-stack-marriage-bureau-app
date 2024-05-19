import React, { useEffect, useState } from "react";
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
import pic from "../../assets/images/blur.jpg";

import { getPhoto } from "../../ServerRequests/groomRequest";
const GroomCard = ({ data, setPhotoLoading, photoLoading }) => {
  const [photo, setPhoto] = useState({});
  const handlePhoto = async () => {
    try {
      const res = await getPhoto("groom/get-single-photo/" + data?._id);
      if (res && res.data) {
        setPhoto(res.data.data);
      } else {
        console.log("there error when fetching groom picture");
      }
    } catch (error) {
      console.log("there is error", error);
    } finally {
      setPhotoLoading(false);
    }
  };
  useEffect(() => {
    handlePhoto();
  }, [data._id]);

  const base64String = photo?.photo?.data
    ? Buffer.from(photo.photo.data).toString("base64")
    : "";
  // Construct the data URL for the image
  const imageUrl = photo?.photo?.contentType
    ? `data:${photo.photo.contentType};base64,${base64String}`
    : "";
  if (photoLoading) return "";
  return (
    <Card
      style={{
        //   width: '18rem',
        marginBottom: "25px",
        overflow: "hidden",
      }}
    >
      <div className={`groom-img `}>
        {imageUrl && <img alt="Sample" src={imageUrl} />}
      </div>

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
          Cast: <span className="info"> {data.cast} </span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          Education:{" "}
          <span className="info">
            {data.qualification ? data.qualification : "Not mentioned"}{" "}
          </span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          Businnes:{" "}
          <span className="info">
            {data.job ? data.job : "Not mentioned"}{" "}
          </span>
        </CardSubtitle>
        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
          City: <span className="info"> {data.city}</span>
        </CardSubtitle>
     
      
        {/* {lookingFor === data._id && (
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
        )} */}

        {/* <Button className='looking-for-btn' color='primary'>
      
      </Button> */}
        {/* <span
          className="look-for"
          onClick={() => {
            setLookingFor(data._id === lookingFor ? "" : data._id);
          }}
        >
          {lookingFor ? "Hide" : "      Looking for          "} */}
        {/* </span> */}
        <Link to={`/${data._id}`} className="details-btn">
          {" "}
          details
        </Link>
      </CardBody>
    </Card>
  );
};

export default GroomCard;
