import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5" style={{position: "static", bottom: 0, width: "100%"}}>
      
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2023 CSE299, Project_Group-4_ITN
      </div>
    </footer>
  );
};

export default Footer;

