import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faAddressCard, faStar, faClock, faLock } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import defaultProfilePicture from "./default-profile-picture.jpg"; // Replace with your default profile picture

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const { userType, email } = location.state;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${userType}User/user/${email}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [userType, email]);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="dashboard-card shadow animate__animated animate__fadeIn">
            <Card.Body>
              <Card.Title className="dashboard-title">Welcome to Your Profile</Card.Title>
              {userData && (
                <div>
                  <div className="dashboard-data">
                    <p className="dashboard-label">
                      <FontAwesomeIcon icon={faAddressCard} className="dashboard-icon" />
                      <strong>Name:</strong>
                    </p>
                    <p className="dashboard-value h5 text-primary">{userData.name}</p>
                  </div>
                  <div className="dashboard-data">
                    <p className="dashboard-label">
                      <FontAwesomeIcon icon={faEnvelope} className="dashboard-icon" />
                      <strong>Email:</strong>
                    </p>
                    <p className="dashboard-value h6 text-muted">{userData.email}</p>
                  </div>
                  <div className="dashboard-data">
                    <p className="dashboard-label">
                      <FontAwesomeIcon icon={faAddressCard} className="dashboard-icon" />
                      <strong>Address:</strong>
                    </p>
                    <p className="dashboard-value h6">{userData.address}</p>
                  </div>
                  <div className="dashboard-data">
                    <p className="dashboard-label">
                      <FontAwesomeIcon icon={faAddressCard} className="dashboard-icon" />
                      <strong>Profile Picture:</strong>
                    </p>
                    {userData.profilePicture ? (
                      <img
                        src={userData.profilePicture}
                        alt="Profile"
                        className="dashboard-profile-picture img-fluid rounded-circle"
                      />
                    ) : (
                      <img
                        src={defaultProfilePicture}
                        alt="Default Profile"
                        className="dashboard-default-profile-picture img-fluid rounded-circle"
                      />
                    )}
                  </div>
                  <div className="dashboard-data">
                    <p className="dashboard-label">
                      <FontAwesomeIcon icon={faStar} className="dashboard-icon" />
                      <strong>Rating:</strong>
                    </p>
                    <p className="dashboard-value h6">{userData.ratings}</p>
                  </div>
                  <div className="dashboard-data">
                    <p className="dashboard-label">
                      <FontAwesomeIcon icon={faAddressCard} className="dashboard-icon" />
                      <strong>Tags:</strong>
                    </p>
                    <p className="dashboard-value h6">{userData.tags.join(", ")}</p>
                  </div>
                  <div className="dashboard-data">
                    <p className="dashboard-label">
                      <FontAwesomeIcon icon={faClock} className="dashboard-icon" />
                      <strong>Creation Time:</strong>
                    </p>
                    <p className="dashboard-value h6">{userData.createdAt}</p>
                  </div>
                  {/* Additional user data */}
                  <div className="dashboard-data">
                    <Button variant="primary">
                      <FontAwesomeIcon icon={faLock} className="mr-2" />
                      <Link
                        to={{
                          pathname: "/update-password",
                          state: {
                            email: email,
                            userType: userType,
                          },
                        }}
                        className="text-white"
                      >
                        Update Password
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;














