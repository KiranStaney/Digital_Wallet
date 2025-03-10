import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ReceiveMoney.css";

const ReceiveMoney = () => {
  const { state } = useLocation();
  const { setCurrentBalance } = state || {};

  const [buttonText, setButtonText] = useState("Copy");
  const [walletId] = useState(generateWalletId());

  function generateWalletId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let walletId = "";
    for (let i = 0; i < 4; i++) {
      walletId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return walletId;
  }

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(walletId)
        .then(() => {
          setButtonText("Copied");
          setTimeout(() => setButtonText("Copy"), 2000);
        })
        .catch(() => {
          alert("Failed to copy wallet ID. Please try again.");
        });
    } else {
      alert("Clipboard access is not supported in your browser.");
    }
  };

  return (
    <div className="receive-money-container">
      <div className="wallet-box">
        <div className="wallet-info">
          <p className="wallet-id">
            Wallet ID: <strong>{walletId}</strong>
          </p>
          <p>Share this ID to receive money.</p>
          <button className="copy-button" onClick={copyToClipboard}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveMoney;
