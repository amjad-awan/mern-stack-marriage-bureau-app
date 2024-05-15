import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import "./style.css";
import { loginUser, regsiterUser } from "../../ServerRequests/Auth";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      try {
        const res = await loginUser("user/login-user", {
          email: formData.email,
          password: formData.password,
        });
        if (res && res.data && res.data.success) {
          setVisible(false);
          navigate("/");
        } else {
          console.log("something went wronge");
        }
      } catch (error) {
        console.log("something went wronge", error);
      }
      return;
    }
    try {
      const res = await regsiterUser("user/register-user", formData);
      if (res && res.data && res.data.success) {
        setVisible(true);
      } else {
        console.log("something went wronge");
      }
    } catch (error) {
      console.log("something went wronge", error);
    }
  };
  const onDismiss = () => setVisible(false);

  return (
    <Form className="auth-form-wrapper" onSubmit={handleSubmit}>
      <Alert
        color="info"
        isOpen={visible}
        toggle={onDismiss}
        onClick={() => {
          setIsRegistering(false);
          setVisible(false);
        }}
      >
        Account is created successfully, click here to go to login
      </Alert>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          type="email"
        />
      </FormGroup>
      {isRegistering && (
        <FormGroup>
          <Label for="exampleName">Name</Label>
          <Input
            id="exampleName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your email"
            type="text"
          />
        </FormGroup>
      )}

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
        <p
          onClick={() => setIsRegistering((prev) => !prev)}
          className="__form-toggler"
        >
          {isRegistering
            ? " Have already account?. click here to login"
            : "Don't have account?. go to login"}
        </p>
      </FormGroup>
    </Form>
  );
};

export default AuthForm;
