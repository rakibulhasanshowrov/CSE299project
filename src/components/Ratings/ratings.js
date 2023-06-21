import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ratings = () => {
  const [userType, setUserType] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [ratingsData, setRatingsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, [userType]);

  useEffect(() => {
    filterRatings();
  }, [ratingsData, emailFilter]);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${userType}User/ratings`);
      setRatingsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterRatings = () => {
    if (emailFilter.trim() === '') {
      setFilteredData(ratingsData);
    } else {
      const filtered = ratingsData.filter((rating) =>
        rating.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleEmailFilterChange = (event) => {
    setEmailFilter(event.target.value);
  };

  return (
    <div className="container">
      
      <h1 className="mt-4 mb-3">User Ratings</h1>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/review">
          <button className="btn btn-primary">Give Rating</button>
        </Link>

        <div className="form-group">
          <select className="form-control" value={userType} onChange={handleUserTypeChange}>
            <option value="">Select User Type</option>
            <option value="tenant">Tenant</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Email"
              value={emailFilter}
              onChange={handleEmailFilterChange}
            />
          </div>
        </form>
      </div>
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Average Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((rating, index) => (
            <tr key={rating.email} className={index % 2 === 0 ? 'table-primary' : 'table-light'}>
              <td>{rating.email}</td>
              <td>{rating.rating}</td>
              <td>{rating.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ratings;


















