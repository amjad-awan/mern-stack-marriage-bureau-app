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
  Spinner,
} from "reactstrap";
import "./style.css";
import { loginUser, regsiterUser } from "../../ServerRequests/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import axios from "axios";
const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const { setAuth } = useAuth()

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

    if (isRegistering && !formData.name || !formData.email || !formData.password) {
      toast.error("Please fill the form")
      return
    }
    setIsLoading(true)
    if (!isRegistering) {
      try {
        const res = await loginUser("user/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log("res55",res)

        if (res && res.data && res.data.success) {
          setAuth(res.data)
          setVisible(false);
          localStorage.setItem("user", JSON.stringify(res.data.user) )
          navigate("/");
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.log("something went wrong", error);
        if(error.response.status===400){
          toast.error(error.response.data.message)
        }
      } finally {
        setIsLoading(false)
      }
      return;
    }
    try {
      const res = await regsiterUser("user/register", formData);
      if (res && res.data && res.data.success) {
        setVisible(true);
        toast.success("Account created")
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log("something went wrong", error);
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
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
            placeholder="Enter your name"
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
        {/* <Button color="primary" type="submit">
          Submit
        </Button> */}
        <Button color="primary" disabled={isLoading} type="submit">
          {isLoading && <Spinner size="sm" className="me-2"></Spinner>}

          <span>{isLoading ? "Submitting" : "Submit"}</span>
        </Button>
        <p
          onClick={() => setIsRegistering((prev) => !prev)}
          className="__form-toggler"
        >
          {isRegistering
            ? " Have already account?. Click here to login"
            : "Don't have account?.Go to register"}
        </p>
      </FormGroup>
    </Form>
  );
};

export default AuthForm;
