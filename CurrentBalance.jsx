import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CurrentBalance.css";

const CurrentBalance = () => {
  const [pin, setPin] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const [error, setError] = useState("");
  const correctPin = "1234";
  const balance = 5000;
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (/^[0-9]$/.test(event.key)) {
        if (pin.length < 4) {
          setPin(pin + event.key);
        }
      } else if (event.key === "Backspace") {
        setPin(pin.slice(0, -1));
      } else if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pin]);

  const handleSubmit = () => {
    if (pin === correctPin) {
      setShowBalance(true);
      setError("");
    } else {
      setError("INCORRECT PIN");
      setPin("");
    }
  };

  return (
    <div className="current-balance-container">
      {!showBalance ? (
        <div className="pin-box slide-up">
          <h2 className="enter-pin-text">ENTER PIN</h2>
          <div className="pin-display">{pin.replace(/./g, "•")}</div>
          {error && <p className="error-message">{error}</p>}
          <button className="ok-button" onClick={handleSubmit}>
            OK
          </button>
        </div>
      ) : (
        <div className="balance-box">
          <div className="balance-display">Current Balance: ₹{balance}</div>
          <button className="back-button" onClick={() => navigate("/dashboard")}>Back</button>
        </div>
      )}
    </div>
  );
};

export default CurrentBalance;