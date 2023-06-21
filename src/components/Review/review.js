import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = () => {
  const [userType, setUserType] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (userType) {
      fetchUsers();
    }
  }, [userType]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${userType}User/ratings`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setSelectedUserEmail('');
  };

  const handleEmailFilterChange = (event) => {
    setEmailFilter(event.target.value);
  };

  const handleUserChange = (event) => {
    const selectedUserEmail = event.target.value;
    setSelectedUserEmail(selectedUserEmail);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!selectedUserEmail) {
        console.error('Please select an email address');
        return;
      }

      // Send the rating and comment to the server
      await axios.post(`http://localhost:5000/${userType}User/review`, {
        email: selectedUserEmail,
        rating,
        comment,
      });
      // Reset the form
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(emailFilter.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="mt-4 mb-3">Give Rating</h1>
      <div className="form-group">
        <label htmlFor="userType">User Type:</label>
        <select className="form-control" id="userType" value={userType} onChange={handleUserTypeChange}>
          <option value="">Select User Type</option>
          <option value="tenant">Tenant</option>
          <option value="owner">Owner</option>
        </select>
      </div>
      {userType && (
        <>
          <div className="form-group">
            <label htmlFor="emailFilter">Filter by Email:</label>
            <input
              type="text"
              className="form-control"
              id="emailFilter"
              value={emailFilter}
              onChange={handleEmailFilterChange}
            />
          </div>
          {filteredUsers.length > 0 && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="selectedUser">Select User:</label>
                <select className="form-control" id="selectedUser" value={selectedUserEmail} onChange={handleUserChange}>
                  <option value="">Select User</option>
                  {filteredUsers.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select className="form-control" id="rating" value={rating} onChange={handleRatingChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  className="form-control"
                  id="comment"
                  rows="4"
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Review;



