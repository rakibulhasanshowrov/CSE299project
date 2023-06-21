import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Homepage from "./components/Homepage";
import AllAddListing from "./components/AllAddListings/AllAddListings";
import PostAdd from "./components/postAd/postAd";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Homepage from "./components/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import SearchComponent from './components/SearchComponent/SearchComponent';
import UpdatePassword from './components/updatePassword/updatePassword';
import Ratings from './components/Ratings/ratings.js';
import Review from "./components/Review/review";
function App() {
  return (
    <div className="App">
      <Router>
        <Homepage />
        {/* <SearchComponent /> */}
        <Routes>
        <Route exact path="/" element={<Home />} />
        
          <Route exact path="/get" element={<AllAddListing />} />

          <Route path="/search" component={SearchComponent} /> 

          <Route exact path="/postAdd" element={<PostAdd />} />
          
          <Route exact path="/login" element={<Login />} />

          <Route  path="/dashboard/" element={<Dashboard />} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <Route exact path="/ratings" element={<Ratings />} />
          <Route exact path="/review" element={<Review />} />

          
          <Route exact path="/register" element={<Register />} />
         
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;







