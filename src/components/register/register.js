import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col, FormControl } from "react-bootstrap";

const Register = () => {
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { userType, name, email, password, phoneNumber };
      const response = await axios.post(`http://localhost:5000/${userType}User/register`, userData);
      console.log(response.data);
      if (response.status === 201) {
        setSuccessMessage("Registration successful!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2>Register</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleRegister} className="mt-4">
            <FormControl as="select" value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="">Select user type</option>
              <option value="tenant">Tenant</option>
              <option value="owner">Owner</option>
            </FormControl>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;