import React, { useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./style.css";
import { addGroom } from "../../ServerRequests/grromRequest";
import { toast } from "react-toastify";
const AddNewForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    age: "",
    phoneNumber: "",
    martialStatus: "single",
    height: "",
    qualification: "",
    collegeUniversity: "",
    job: "",
    income: "",
    religion: "",
    sect: "",
    cast: "",
    home: "",
    size: "",
    city: "",
    address: "",
    migration: "",
    nationality: "",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
    marriedBrothers: "",
    marriedSisters: "",
  });
  const [formErrors, setFormErrors] = useState({});

  console.log("formErrors", formErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Set the error message for the field to an empty string
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        qualification,
        income,
        address,
        collegeUniversity,
        fatherOccupation,
        motherOccupation,
        brothers,
        sisters,
        marriedBrothers,
        marriedSisters,
        ...rest
      } = formData;
      console.log("rest", rest);
      const errors = validateForm(rest);
      if (Object.keys(errors).length === 0) {
        const res = await addGroom("groom/add-groom", formData);
        if (res && res.data && res.data.success) {
          toast.success("Groom is added successfully!");
        }
      } else {
        setFormErrors(errors);
        console.log("must filled required fields");

        toast.error("Fill out all required fields");
      }
    } catch (error) {
      console.log("error while adding groom", error);
      toast.error("oops!, There ir error while adding groom");
    }
  };
  const validateForm = (data) => {
    let errors = {};
    Object.keys(data).forEach((key) => {
      if (data[key].trim() === "") {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });
    return errors;
  };
  return (
    <Form className="mt-3 mb-5" onSubmit={handleSubmit}>
      <Row className="__form-information-wrapper">
        <Col sm={12}>
          <Label className="__data-title">Personal Information</Label>
        </Col>
        <Col sm={12}>
          <Label for="exampleEmail">Gender</Label>
          <FormGroup block>
            <FormGroup check inline>
              <Input
                id="male"
                name="gender"
                type="radio"
                value="male"
                onChange={handleChange}
              />{" "}
              <Label check for="male">
                Male
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                id="female"
                name="gender"
                type="radio"
                value="female"
                onChange={handleChange}
              />
              <Label check for="female">
                Female
              </Label>
            </FormGroup>
            {formErrors.gender && (
              <div className="text-danger">{formErrors.gender}</div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleName">Name</Label>
            <Input
              id="exampleName"
              name="name"
              placeholder="Enter name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <div className="text-danger">{formErrors.name}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter phone number"
              type="number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {formErrors.phoneNumber && (
              <div className="text-danger">{formErrors.phoneNumber}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="exampleAge">Age</Label>
            <Input
              id="exampleAge"
              name="age"
              placeholder="Enter Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
            {formErrors.age && (
              <div className="text-danger">{formErrors.age}</div>
            )}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="exampleMartialStatus">Martial Status</Label>
            <Input
              defaultValue="single"
              name="martialStatus"
              type="select"
              id="exampleMartialStatus"
              value={formData.martialStatus}
              onChange={handleChange}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorce">Divorce</option>
              <option value="other">Other</option>
            </Input>
            {formErrors.martialStatus && (
              <div className="text-danger">{formErrors.martialStatus}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="exampleHeight">Height</Label>
            <Input
              id="exampleHeight"
              name="height"
              placeholder="Enter Height"
              type="number"
              value={formData.height}
              onChange={handleChange}
            />
            {formErrors.height && (
              <div className="text-danger">{formErrors.height}</div>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row className="__form-information-wrapper">
        <Col sm={12}>
          <Label className="__data-title"> EDUCATION DETAILS </Label>
        </Col>
        <Col>
          <FormGroup>
            <Label for="Qualification">Qualification</Label>
            <Input
              type="select"
              id="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            >
              <option>Bachelor </option>
              <option>MSC</option>
              <option>PHD</option>
              <option>Bachelor </option>
              <option>Metric</option>
              <option>Middle</option>
            </Input>
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="University">College /University:</Label>
            <Input
              id="University"
              placeholder="Enter college/university name.."
              type="text"
              name="collegeUniversity"
              value={formData.collegeUniversity}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="__form-information-wrapper">
        <Col sm={12}>
          <Label className="__data-title"> OCCUPATION DETAIL </Label>
        </Col>
        <Col>
          <FormGroup>
            <Label for="Job">Job</Label>
            <Input
              type="select"
              id="Job"
              name="job"
              value={formData.job}
              onChange={handleChange}
            >
              <option>Own business </option>
              <option>Govt job</option>
              <option>Private job</option>
              <option>Unemployed </option>
            </Input>
            {formErrors.job && (
              <div className="text-danger">{formErrors.job}</div>
            )}
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="Income">Income</Label>
            <Input
              id="Income"
              name="income"
              placeholder="Enter Income..."
              type="text"
              value={formData.income}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="__form-information-wrapper">
        <Col sm={12}>
          <Label className="__data-title"> RELIGION DETAILS </Label>
        </Col>
        <Col>
          <FormGroup>
            <Label for="Religion">Religion</Label>
            <Input
              type="select"
              id="Religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            >
              <option>Islam </option>
              <option>Hindu</option>
              <option>Sikh</option>
              <option>Christian </option>
              <option>Jew </option>

              <option>other </option>
            </Input>
            {formErrors.religion && (
              <div className="text-danger">{formErrors.religion}</div>
            )}
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="Sect">Sect</Label>
            <Input
              type="select"
              id="Sect"
              name="sect"
              value={formData.sect}
              onChange={handleChange}
            >
              <option>Sunni </option>
              <option>Brelvi</option>
              <option>Deobandi</option>
              <option>Shia </option>
              <option>Ahle-e-hadees </option>

              <option>other </option>
            </Input>
            {formErrors.sect && (
              <div className="text-danger">{formErrors.sect}</div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="Cast">Cast</Label>
            <Input
              id="Cast"
              name="cast"
              placeholder="Enter Cast..."
              type="text"
              value={formData.cast}
              onChange={handleChange}
            />
            {formErrors.cast && (
              <div className="text-danger">{formErrors.cast}</div>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row className="__form-information-wrapper">
        <Col sm={12}>
          <Label className="__data-title"> RESIDENCE DETAILS </Label>
        </Col>
        <Col sm={12}>
          <Label for="exampleEmail">Home</Label>
          <FormGroup block>
            <FormGroup check inline>
              <Input
                id="HomeOwn"
                name="home"
                type="radio"
                value="Own"
                onChange={handleChange}
              />{" "}
              <Label check for="HomeOwn">
                Own
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                id="Rent"
                name="home"
                type="radio"
                value="Rent"
                onChange={handleChange}
              />
              <Label check for="Rent">
                Rent
              </Label>
            </FormGroup>
            {formErrors.home && (
              <div className="text-danger">{formErrors.home}</div>
            )}
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="Size">Size</Label>
            <Input
              id="Size"
              name="size"
              placeholder="Enter Size..."
              type="text"
              value={formData.size}
              onChange={handleChange}
            />
            {formErrors.size && (
              <div className="text-danger">{formErrors.size}</div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="City">City</Label>
            <Input
              id="City"
              name="city"
              placeholder="Enter City..."
              type="text"
              value={formData.city}
              onChange={handleChange}
            />
            {formErrors.city && (
              <div className="text-danger">{formErrors.city}</div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="Address">Address</Label>
            <Input
              id="Address"
              name="address"
              placeholder="Enter Address..."
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <Label for="Migration">Migration</Label>

          <FormGroup>
            <Input
              defaultValue="single"
              name="migration"
              type="select"
              id="exampleMartialStatus"
              value={formData.migration}
              onChange={handleChange}
            >
              <option value="Jalandhar">Jalandhar</option>
              <option value="Amritsir">Amritsar</option>
              <option value="Ludhiana">Ludhiana</option>
              <option value="Meta">Meta</option>
              <option value="Gurdaspur">Gurdaspur</option>
              <option value="Hoshiarpur">Hoshiarpur</option>
            </Input>
            {formErrors.migration && (
              <div className="text-danger">{formErrors.migration}</div>
            )}
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="Nationality">Nationality</Label>
            <Input
              id="Nationality"
              name="nationality"
              placeholder="Enter Nationality..."
              type="text"
              value={formData.nationality}
              onChange={handleChange}
            />
            {formErrors.nationality && (
              <div className="text-danger">{formErrors.nationality}</div>
            )}
          </FormGroup>
        </Col>
      </Row>

      <Row className="__form-information-wrapper">
        <Col sm={12}>
          <Label className="__data-title"> FAMILY DETAILS </Label>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="Occupations">Father's Occupations</Label>
            <Input
              type="select"
              id="Occupations"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
            >
              <option>Own business </option>
              <option>Govt job</option>
              <option>Private job</option>
              <option>Unemployed </option>
            </Input>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="Mother's">Mother's Occupation</Label>
            <Input
              type="select"
              id="Mother's"
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleChange}
            >
              <option>Own business </option>
              <option>Govt job</option>
              <option>Private job</option>
              <option>Unemployed </option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="Brothers">Brothers</Label>
            <Input
              id="Brothers"
              name="brothers"
              placeholder="Enter Brothers..."
              type="number"
              value={formData.brothers}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="Sisters">Sisters</Label>
            <Input
              id="Sisters"
              name="sisters"
              placeholder="Enter Sisters..."
              type="number"
              value={formData.sisters}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="MarriedBrothers">Married Brothers</Label>
            <Input
              id="MarriedBrothers"
              name="marriedBrothers"
              placeholder="Enter Married Brothers..."
              type="number"
              value={formData.marriedBrothers}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>{" "}
        <Col md={6}>
          <FormGroup>
            <Label for="MarriedSisters">Married Sisters</Label>
            <Input
              id="MarriedSisters"
              name="marriedSisters"
              placeholder="Enter Married Sisters..."
              type="number"
              value={formData.marriedSisters}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Button type="submit" color="primary">
        Submit
      </Button>
    </Form>
  );
};

export default AddNewForm;
