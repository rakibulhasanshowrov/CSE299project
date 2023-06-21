import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import background from "./background.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform search functionality with the searchQuery
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="home-content">
        <h1 className="display-3">Find Your Perfect Roommate or Room</h1>
        <p className="lead">Looking for a roommate or a room for rent? Our website makes it easy to find the perfect match.</p>
        {!showSearch ? (
          <button className="btn btn-primary btn-lg" onClick={handleSearchClick}>
            Search for Roommates/Rooms
          </button>
        ) : (
          <form className="search-form" onSubmit={handleFormSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter search query"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;

