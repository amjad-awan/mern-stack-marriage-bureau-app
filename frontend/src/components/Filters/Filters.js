import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useGrooms } from "../../context/groomContext";
import { Sects, majorCastes, majorCountries, pakistanCities } from "../../constants/data";
import "./style.css"
import { getURLParams, setQueryParams } from "../../helpers/URLParams";
const Filters = () => {
  const { params, setParams } = useGrooms();
  const urlParams = getURLParams()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

   
  
    // Update the query string whenever params change
    useEffect(() => {
      setQueryParams(params);
    }, [params]);
    // useEffect(() => {
    //   setParams(urlParams);
    // }, [params]);

  return (
    <div className="filter-wrapper">
      <FormGroup tag="fieldset">
        <legend>Gender</legend>
        <Input
          id="male"
          name="gender"
          type="radio"
          value="male"
          checked={urlParams.gender === "male"}
         
          onChange={handleInputChange}
        />
        <Label htmlFor="male" check  style={{ margin: "0px 30px 0px 10px" }}>
          Male
        </Label>
        <Input
          id="female"
          name="gender"
          type="radio"
          value="female"
          checked={urlParams.gender === "female"}
          onChange={handleInputChange}
        />
        <Label htmlFor="female" check style={{ margin: "0px 0px 0px 10px" }}>
          Female
        </Label>
      </FormGroup>
      <Row>
      
        <Col md={12} lg={12}>
          <FormGroup>
            <Label for="exampleHeight">Height</Label>
            <Input
              value={urlParams.height}
              name="height"
              type="text"
              id="exampleHeight"
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md={12} lg={12}>
          <FormGroup>
            <Label for="exampleQualification">Qualification</Label>
            <Input
               value={urlParams.qualification}
              name="qualification"
              type="select"
              id="exampleQualification"
              onChange={handleInputChange}
            >
                <option>Select Qualfication </option>
             <option>Bachelor </option>
              <option>MSC</option>
              <option>PHD</option>
              <option>Bachelor </option>
              <option>Metric</option>
              <option>Middle</option>

              </Input>
          </FormGroup>
        </Col>
        <Col md={12} lg={12}>
          <FormGroup>
            <Label for="exampleSect">Sect</Label>
            <Input
             value={urlParams.sect}
              name="sect"
              type="select"
              id="exampleSect"
              onChange={handleInputChange}
            >
              <option>Select Sect </option>

{Sects.map((sect, index) => {
  return (
    <option key={index} value={sect}>
      {sect}
    </option>
  );
})}
</Input>
          </FormGroup>
        </Col>

        <Col md={12} lg={12}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input
              type="select"
              name="city"
              id="exampleCity"
              value={urlParams.city}
              onChange={handleInputChange}
            >
              <option value="">Select City</option>
              {pakistanCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
              {/* Add more cities as needed */}
            </Input>
          </FormGroup>
        </Col>
        <Col md={12} lg={12}>
          <FormGroup>
            <Label for="exampleNationality">Nationality</Label>
            <Input
              type="select"
              name="nationality"
              id="exampleNationality"
              value={urlParams.nationality}

              onChange={handleInputChange}
            >
              <option value="">Select Nationality</option>
             
              {majorCountries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
              {/* Add more nationalities as needed */}
            </Input>
          </FormGroup>
        </Col>
        <Col md={12} lg={12}>
          <FormGroup>
            <Label for="exampleMartialStatus">Martial Status</Label>
            <Input
              type="select"
              name="martialStatus"
              id="exampleMartialStatus"
              value={urlParams.martialStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Martial Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="other">Other</option>
            </Input>
          </FormGroup>
        </Col>

        <Col md={12} lg={12}>
          <FormGroup>
            <Label for="exampleCast">Cast</Label>
            <Input
              type="select"
              name="cast"
              id="exampleCast"
              value={urlParams.cast}
              
              onChange={handleInputChange}
            >
              <option value="">Select Cast</option>
             
             {majorCastes.map((cast, index) => (
               <option key={index} value={cast}>
                 {cast}
               </option>
             ))}

</Input>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Filters;
