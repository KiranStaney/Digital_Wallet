import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuBar.css"; 

const FrontPage = () => {
  const navigate = useNavigate();

  
  const bgImageUrl = "https://i1.sndcdn.com/avatars-5pRYKz6DzcUfUdTq-WRvZyQ-t1080x1080.jpg";

  return (
    <div className="front-page" style={{ backgroundImage: `url(${bgImageUrl})` }}>
      <div className="top-right-buttons">
        <button onClick={() => navigate("/login")} className="auth-button">Login</button>
        <button onClick={() => navigate("/signup")} className="auth-button">Sign Up</button>
      </div>
    </div>
  );
};

export default FrontPage;