import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import "./style.css";
import { addGroom } from "../../ServerRequests/groomRequest";
import { toast } from "react-toastify";
import {
  Sects,
  majorCastes,
  majorCountries,
  pakistanCities,
} from "../../constants/data";
import { FiEdit } from "react-icons/fi";

const AddNewForm = () => {
  const [requirements, setRequirements] = useState({
    requiredAge: "",
    requiredHeight: "",
    requiredCity: "Faisalabad",
    requiredCast: "Shaikh",
    requiredQualification: "",
    requiredSect: "",
  });
  const [requirementsErrors, setRequirementsErrors] = useState({});
  const [isNoPicture, setIsNoPicture]= useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    age: "",
    phoneNumber: "",
    martialStatus: "single",
    height: "",
    qualification: "",
    collegeUniversity: "",
    job: "Own business",
    income: "",
    religion: "Islam",
    sect: "",
    cast: "Shaikh",
    home: "",
    size: "",
    city: "Faisalabad",
    address: "",
    migration: "",
    nationality: "Pakistan",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
    marriedBrothers: "",
    marriedSisters: "",
    filePhoto: "",
  });
  const [formErrors, setFormErrors] = useState({});

  console.log("formData",formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handlePhotoChange = (e) => {
    setFormData({ ...formData, filePhoto: e.target.files[0] });
    setIsNoPicture(false)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        filePhoto,
        ...rest
      } = formData;
      const errors = validateForm({ ...rest });
      console.log(errors);
if(!formData.filePhoto){
  setIsNoPicture(true)
}
      const requirementsSrrors = validateForm(requirements);
      // console.log(requirementsSrrors)
      if (
        Object.keys(errors).length === 0 &&
        Object.keys(requirementsSrrors).length === 0
      ) {
        const data = { ...formData, ...requirements };
        const formDataToSend = new FormData();
        console.log("data94", data);
        formDataToSend.append("photo", data.filePhoto); // Append the photo data
        formDataToSend.append("gender", data.gender); // Append other fields
        formDataToSend.append("name", data.name);
        formDataToSend.append("age", data.age);
        formDataToSend.append("martialStatus", data.martialStatus);
        formDataToSend.append("phoneNumber", data.phoneNumber);
        formDataToSend.append("height", data.height);
        formDataToSend.append("qualification", data.qualification);
        formDataToSend.append("collegeUniversity", data.collegeUniversity);
        formDataToSend.append("job", data.job);
        formDataToSend.append("income", data.income);
        formDataToSend.append("religion", data.religion);
        formDataToSend.append("sect", data.sect);
        formDataToSend.append("cast", data.cast);
        formDataToSend.append("home", data.home);
        formDataToSend.append("size", data.size);
        formDataToSend.append("city", data.city);
        formDataToSend.append("address", data.address);
        formDataToSend.append("migration", data.migration);
        formDataToSend.append("nationality", data.nationality);
        formDataToSend.append("fatherOccupation", data.fatherOccupation);
        formDataToSend.append("motherOccupation", data.motherOccupation);
        formDataToSend.append("brothers", data.brothers);
        formDataToSend.append("sisters", data.sisters);
        formDataToSend.append("marriedBrothers", data.marriedBrothers);
        formDataToSend.append("marriedSisters", data.marriedSisters);

        // Append requirements fields
        formDataToSend.append("requiredAge", data.requiredAge);
        formDataToSend.append("requiredHeight", data.requiredHeight);
        formDataToSend.append("requiredCity", data.requiredCity);
        formDataToSend.append("requiredCast", data.requiredCast);
        formDataToSend.append(
          "requiredQualification",
          data.requiredQualification
        );
        formDataToSend.append("requiredSect", data.requiredSect);

        const res = await addGroom("groom/add-groom", formDataToSend);
        if (res && res.data && res.data.success) {
          toast.success("Groom is added successfully!");
          setIsLoading(false);
        }
      } else {
        setFormErrors(errors);
        setRequirementsErrors(requirementsSrrors);
        console.log("must filled required fields");
        toast.error("Fill out all required fields");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error while adding groom", error);
      toast.error("oops!, There is error while adding groom");
      setIsLoading(false);
    }
  };

  const validateForm = (data) => {
    console.log("data", data);
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
        <Col sm={12} md={6}>
          <FormGroup block>
            <Label htmlFor="pic" className="select-pic">
              {!formData.filePhoto.name && "Select picture"}
              {formData.filePhoto.name && <span>{formData.filePhoto.name}</span>}
              {isNoPicture && (
                <div className="text-danger">Picture is required</div>
              )}
            </Label>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".png,.jpg,.jpeg"
              id="pic"
              name="filePhoto"
              onChange={handlePhotoChange}
            />
          </FormGroup>

          {formData.filePhoto && (
            <Card className="imag-wrapper">
              <Label htmlFor="pic" className="edit-btn">
                <FiEdit />
              </Label>
              <img className="" src={URL.createObjectURL(formData.filePhoto)} />
            </Card>
          )}
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
              <option>Select martial status</option>
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
              <option> Select Qualfication </option>
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
              <option>Own business</option>

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
              <option>Select Sect </option>

              {Sects.map((sect, index) => {
                return (
                  <option key={index} value={sect}>
                    {sect}
                  </option>
                );
              })}
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
              type="select"
              value={formData.cast}
              defaultValue="Shaikh"
              onChange={handleChange}
            >
              <option>Shaikh</option>

              {majorCastes.map((cast, index) => (
                <option key={index} value={cast}>
                  {cast}
                </option>
              ))}
            </Input>
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
              type="select"
              value={formData.city}
              onChange={handleChange}
            >
              <option>Select City </option>

              {pakistanCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Input>
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
              <option>Select Migration </option>

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
              type="select"
              value={formData.nationality}
              onChange={handleChange}
            >
              <option value="">Pakistan</option>
              {majorCountries.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
              {/* Add more cities as needed */}
            </Input>
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
            <Label for="Occupations">Father's Occupation</Label>
            <Input
              type="select"
              id="Occupations"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
            >
              <option>Select Father's Occupation </option>

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
              <option>Select Mother's Occupation </option>

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
      <Row className="__form-information-wrapper">
        <Col sm={12}>
          <Label className="__data-title"> Looking for </Label>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="requiredAge">Age</Label>
            <Input
              type="number"
              id="requiredAge"
              name="requiredAge"
              value={requirements.requiredAge}
              onChange={(a) => {
                setRequirements({
                  ...requirements,
                  requiredAge: a.target.value,
                });
                setRequirementsErrors((prevErrors) => ({
                  ...prevErrors,
                  requiredAge: "", // Set the error message for the field to an empty string
                }));
              }}
            />
            {requirementsErrors.requiredAge && (
              <div className="text-danger">
                {requirementsErrors.requiredAge}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="requiredHeight">Height</Label>
            <Input
              type="number"
              id="requiredHeight"
              name="requiredHeight"
              value={requirements.requiredHeight}
              onChange={(a) => {
                setRequirements({
                  ...requirements,
                  requiredHeight: a.target.value,
                });

                setRequirementsErrors((prevErrors) => ({
                  ...prevErrors,
                  requiredHeight: "", // Set the error message for the field to an empty string
                }));
              }}
            />

            {requirementsErrors.requiredHeight && (
              <div className="text-danger">
                {requirementsErrors.requiredHeight}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="city">city</Label>
            <Input
              type="select"
              id="requiredCity"
              name="requiredCity"
              value={requirements.requiredCity}
              onChange={(a) => {
                setRequirements({
                  ...requirements,
                  requiredCity: a.target.value,
                });
                setRequirementsErrors((prevErrors) => ({
                  ...prevErrors,
                  requiredCity: "", // Set the error message for the field to an empty string
                }));
              }}
            >
              <option>Faisalabad </option>

              {pakistanCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Input>

            {requirementsErrors.requiredCity && (
              <div className="text-danger">
                {requirementsErrors.requiredCity}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="requiredQualfication">Qualfication</Label>
            <Input
              type="select"
              id="requiredQualification"
              name="requiredQualification"
              value={requirements.requiredQualification}
              onChange={(a) => {
                setRequirements({
                  ...requirements,
                  requiredQualification: a.target.value,
                });
                setRequirementsErrors((prevErrors) => ({
                  ...prevErrors,
                  requiredQualification: "", // Set the error message for the field to an empty string
                }));
              }}
            >
              <option>Select Qualfication </option>

              <option>Bachelor </option>
              <option>MSC</option>
              <option>PHD</option>
              <option>Bachelor </option>
              <option>Metric</option>
              <option>Middle</option>
            </Input>
            {requirementsErrors.requiredQualification && (
              <div className="text-danger">
                {requirementsErrors.requiredQualification}
              </div>
            )}
          </FormGroup>
        </Col>{" "}
        <Col md={6}>
          <FormGroup>
            <Label for="requiredSect">Sect</Label>
            <Input
              type="select"
              id="requiredSect"
              name="requiredSect"
              value={requirements.requiredSect}
              onChange={(a) => {
                setRequirements({
                  ...requirements,
                  requiredSect: a.target.value,
                });

                setRequirementsErrors((prevErrors) => ({
                  ...prevErrors,
                  requiredSect: "", // Set the error message for the field to an empty string
                }));
              }}
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
            {requirementsErrors.requiredSect && (
              <div className="text-danger">
                {requirementsErrors.requiredSect}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="requiredCast">Cast</Label>
            <Input
              type="select"
              id="requiredCast"
              name="requiredCast"
              value={requirements.requiredCast}
              onChange={(a) => {
                setRequirements({
                  ...requirements,
                  requiredCast: a.target.value,
                });
                setRequirementsErrors((prevErrors) => ({
                  ...prevErrors,
                  requiredCast: "", // Set the error message for the field to an empty string
                }));
              }}
            >
              <option>Shaikh</option>

              {majorCastes.map((cast, index) => (
                <option key={index} value={cast}>
                  {cast}
                </option>
              ))}
            </Input>
            {requirementsErrors.requiredCast && (
              <div className="text-danger">
                {requirementsErrors.requiredCast}
              </div>
            )}
          </FormGroup>
        </Col>
      </Row>
      {/* <Button type="submit" color="primary">
        Submit
      </Button> */}

      <Button color="primary"  disabled={isLoading} type="submit">
        {isLoading && <Spinner size="sm" className="me-2"></Spinner>}

       <span>{isLoading?"Submitting":"Submit"}</span>
      </Button>
    </Form>
  );
};

export default AddNewForm;
