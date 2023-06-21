import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col, FormControl } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("tenant");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/${userType}User/login`, {
        email,
        password,
      });
      window.localStorage.setItem("authToken", res.data.token);
      setErrorMessage("");
      setEmail("");
      setPassword("");
      alert("Login successful!");
      navigate("/dashboard/", { state: { userType, email } });
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2>Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleLogin} className="mt-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <FormControl
              as="select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="tenant">Login as Tenant</option>
              <option value="owner">Login as Owner</option>
            </FormControl>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Link to="/register">
              <Button variant="link">Register</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;






