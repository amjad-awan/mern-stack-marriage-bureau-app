import React, { useEffect, useState } from "react";
import { Card, CardSubtitle, Col, Row } from "reactstrap";
import { Buffer } from "buffer";
import "./style.css";
import { useParams } from "react-router-dom";
import { getSingleGroom } from "../../ServerRequests/groomRequest";
const SingleGroomWrapper = () => {
    const { id } = useParams();
    const [groom, setGroom] = useState({});
    console.log("groom", groom);

    const handleSingGroom = async () => {
        try {
            const res = await getSingleGroom("groom/get-single-groom/" + id);
            console.log("ress", res);
            if (res && res.data && res.data.data) {
                setGroom(res.data.data);
            } else {
                console.log("There error when fechting single groom");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleSingGroom();
    }, [id]);
    //   const base64String = Buffer?.from(groom?.photo?.data)?.toString("base64");

    //   // // Construct the data URL for the image
    //   const imageUrl = `data:${groom?.photo?.contentType};base64,${base64String}`;

    const base64String = groom?.photo?.data
        ? Buffer.from(groom.photo.data).toString("base64")
        : "";

    // Construct the data URL for the image
    const imageUrl = `data:${groom?.photo?.contentType};base64,${base64String}`;
    return (
        <>
            <Card className="single-groom-wrapper">
                <Row className="gap-4 mb-3">
                    <Col sm={12} md={3}>
                        <div className="img-wrapper">
                            <img src={imageUrl} />
                        </div>
                    </Col>
                    <Col sm={12} md={4}>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Name: <span className="info"> {groom.name}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Gender: <span className="info"> {groom.gender}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Age: <span className="info"> {groom.age} y</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Height: <span className="info"> {groom.height} ft</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Cast: <span className="info"> {groom.cast}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            City: <span className="info"> {groom.city}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Address:{" "}
                            <span className="info">
                                {" "}
                                {groom.address ? groom.address : "Not mentioned"}{" "}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Sect: <span className="info"> {groom.sect}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Qualification:{" "}
                            <span className="info"> {groom.qualification}</span>
                        </CardSubtitle>
                    </Col>

                    <Col sm={12} md={4}>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Martial Status :{" "}
                            <span className="info"> {groom.martialStatus}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Phone Number : <span className="info"> {groom.phoneNumber}</span>
                        </CardSubtitle>

                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Nationality: <span className="info"> {groom.nationality}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Home: <span className="info"> {groom.home}</span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Size: <span className="info"> {groom.size} </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Job:{" "}
                            <span className="info">
                                {" "}
                                {groom.job ? groom.job : "Not mentioned"}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Income:{" "}
                            <span className="info">
                                {" "}
                                {groom.income ? groom.income : "Not mentioned"}{" "}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Colleg/University:{" "}
                            <span className="info">
                                {" "}
                                {groom.collegeUniversity
                                    ? groom.collegeUniversity
                                    : "Not mentioned"}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Migrated from: <span className="info"> {groom.migration}</span>
                        </CardSubtitle>
                    </Col>
                </Row>
                <Row className="gap-4 mb-3">
                    <Col sm={12} md={3}>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Father Occupation:{" "}
                            <span className="info">
                                {" "}
                                {groom.fatherOccupation
                                    ? groom.fatherOccupation
                                    : "Not mentioned"}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Brothers:{" "}
                            <span className="info">
                                {" "}
                                {groom.brothers ? groom.brothers : "Not mentioned"}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Sisters:{" "}
                            <span className="info">
                                {" "}
                                {groom.sisters ? groom.sisters : "Not mentioned"}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Married Brothers:
                            <span className="info">
                                {" "}
                                {groom.marriedBrothers
                                    ? groom.marriedBrothers
                                    : "Not mentioned"}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Married sisters:
                            <span className="info">
                                {" "}
                                {groom.marriedSisters ? groom.marriedSisters : "Not mentioned"}
                            </span>
                        </CardSubtitle>
                    </Col>
                </Row>
            </Card>
            <Card className="single-groom-wrapper">
                <Row className="gap-4 mb-3">
                    <Col sm={12} md={3}>
                        <p className="looking-for m-0 mb-3">Looking for</p>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Age:{" "}
                            <span className="info">
                                {" "}
                                {groom?.requirements?.requiredAge}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Height
                            <span className="info">
                                {" "}
                                {groom?.requirements?.requiredHeight}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            City
                            <span className="info">
                                {" "}
                                {groom?.requirements?.requiredCity}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Cast
                            <span className="info">
                                {" "}
                                {groom?.requirements?.requiredCast}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Qualification
                            <span className="info">
                                {" "}
                                {groom?.requirements?.requiredQualification}
                            </span>
                        </CardSubtitle>
                        <CardSubtitle className=" text-muted text-wrapper" tag="h6">
                            Sect
                            <span className="info">
                                {" "}
                                {groom?.requirements?.requiredSect}
                            </span>
                        </CardSubtitle>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default SingleGroomWrapper;
