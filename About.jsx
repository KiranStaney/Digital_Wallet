import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuBar.css"; 

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h2>About KZY</h2>
      <div className="content">
        <p>
          Welcome to our app! We are dedicated to providing you with a seamless and secure
          experience for managing your finances. Our app allows you to:
        </p>
        <ul>
          <li>Check your current balance.</li>
          <li>Send and receive money easily.</li>
          <li>View your transaction history.</li>
          <li>Pay bills and manage offers.</li>
        </ul>
        <p>
          Our mission is to make financial management simple, fast, and accessible to
          everyone. Thank you for choosing us!
        </p>
      </div>
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default About;