import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const SearchComponent = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    price: '',
    month: '',
    location: '',
    description: '',
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('/search', { params: searchCriteria });
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Search Component</h2>
              <Form onSubmit={handleSearch}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={searchCriteria.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="month">
                  <Form.Label>Month</Form.Label>
                  <Form.Control
                    type="text"
                    name="month"
                    value={searchCriteria.month}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={searchCriteria.location}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={searchCriteria.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8} className="mx-auto">
          {searchResults.length > 0 && (
            <Card className="shadow">
              <Card.Body>
                <h4>Search Results</h4>
                <ul>
                  {searchResults.map((result) => (
                    <li key={result._id}>{/* Display the search results here */}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchComponent;


