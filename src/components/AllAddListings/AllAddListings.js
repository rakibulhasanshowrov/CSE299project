import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { base64Decode } from "./base64Utils.js";

const searchOptions = [
  { value: "location", label: "Location" },
  { value: "price", label: "Price" },
  { value: "month", label: "Month" },
  { value: "keyword", label: "Keyword" },
  // Add more search criteria options as needed
];

const AllAddListings = () => {
  const [addListings, setAddListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/Add/get").then((response) => {
      setAddListings(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let results = [];

    if (selectedCriteria) {
      if (selectedCriteria.value === "location") {
        results = addListings.filter((addListing) =>
          addListing.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (selectedCriteria.value === "price") {
        results = addListings.filter((addListing) =>
          addListing.price.toString().includes(searchQuery)
        );
      } else if (selectedCriteria.value === "month") {
        results = addListings.filter((addListing) =>
          addListing.Month.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (selectedCriteria.value === "keyword") {
        results = addListings.filter((addListing) =>
          addListing.Description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      // Add more conditions for other search criteria as needed
    }

    setSearchResults(results);
  };

  const renderAddListing = (addListing) => (
    <Col md={4} key={addListing._id}>
      <Card className="my-3 shadow-sm">
        {addListing.roomPic && (
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${addListing.roomPic}`}
            alt="Room"
          />
        )}
        <Card.Body>
          <Card.Title>{addListing.location}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> {addListing.price}
            <br />
            <strong>Month:</strong> {addListing.Month}
            <br />
            <strong>Single/Shared:</strong> {addListing.singleOrShared}
            <br />
            <strong>Contact No:</strong> {addListing.contactNo}
            <br />
            <strong>Restriction Status:</strong>{" "}
            {addListing.RestrictionStatus}
            <br />
            <strong>Description:</strong> {addListing.Description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div>
      
      <Form onSubmit={handleSearch}>
        <Row>
          <Col>
            <Form.Group>
              <Select
                options={searchOptions}
                placeholder="Select search criteria"
                value={selectedCriteria}
                onChange={setSelectedCriteria}
              />
            </Form.Group>
          </Col>
          <Col>
            {selectedCriteria && (
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder={`Search by ${selectedCriteria.label}`}
                  value={searchQuery}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}
          </Col>
          <Col>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
      <div className="border border-3 border-dark rounded p-3">
  <h2 className="text-center text-uppercase fw-bold text-dark">All Add Listings</h2>
</div>
      <Row>
        {searchResults.length > 0 ? (
          searchResults.map((addListing) => renderAddListing(addListing))
        ) : (
          addListings.map((addListing) => renderAddListing(addListing))
        )}
      </Row>
    </div>
  );
};

export default AllAddListings;




