import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const PostAd = () => {
  const [roomPic, setRoomPic] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [month, setMonth] = useState("");
  const [singleShared, setSingleShared] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [restrictionStatus, setRestrictionStatus] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("roomPic", roomPic);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("month", month);
    formData.append("singleShared", singleShared);
    formData.append("contactNo", contactNo);
    formData.append("restrictionStatus", restrictionStatus);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5000/Add/postAdd", formData);
      setSuccess("Your ad has been submitted successfully.");
      setRoomPic("");
      setLocation("");
      setPrice("");
      setMonth("");
      setSingleShared("");
      setContactNo("");
      setRestrictionStatus("");
      setDescription("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while submitting your ad. Please try again.");
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setError("Invalid file type. Only JPEG and PNG images are allowed!!!.");
      setRoomPic("");
    } else if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds the limit of 5 MB.");
      setRoomPic("");
    } else {
      setRoomPic(file);
      setError("");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="mb-4">Post Ad</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Room Picture</Form.Label>
              <Form.Control type="file" name="roomPic" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Month</Form.Label>
              <Form.Control type="text" name="month" value={month} onChange={(e) => setMonth(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Single/Shared</Form.Label>
              <Form.Control type="text" name="singleShared" value={singleShared} onChange={(e) => setSingleShared(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact No</Form.Label>
              <Form.Control type="tel" name="contactNo" value={contactNo} onChange={(e) => setContactNo(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Restriction Status</Form.Label>
              <Form.Control type="text" name="restrictionStatus" value={restrictionStatus} onChange={(e) => setRestrictionStatus(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Post Ad
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostAd;
