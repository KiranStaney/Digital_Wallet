import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SendMoney.css";

const SendMoney = ({ currentBalance, setCurrentBalance }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [showPinScreen, setShowPinScreen] = useState(false);
  const [pin, setPin] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slideInMessage, setSlideInMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const contacts = [
    { name: "KIRAN", number: "9876543210" },
    { name: "BALA", number: "8765432109" },
    { name: "SHINEY", number: "7654321098" },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.number.includes(searchTerm)
  );

  const navigate = useNavigate();

  const correctPin = "1234"; 

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (/^[0-9]$/.test(event.key)) {
        handlePinEntry(event.key);
      } else if (event.key === "Backspace") {
        handleBackspace();
      } else if (event.key === "Enter") {
        handlePayment();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pin]);

  const handleConfirmPayment = () => {
    if (!amount || parseInt(amount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    if (parseInt(amount) > currentBalance) {
      setError("Insufficient Balance.");
      return;
    }
    if (selectedOption === "wallet" && walletId.length !== 4) {
      setError("Wallet ID must be exactly 4 characters.");
      return;
    }
    setError("");
    setShowPinScreen(true);
    setPin("");
  };

  const handlePinEntry = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handlePayment = () => {
    if (pin.length !== 4 || isNaN(pin)) {
      setError("Invalid PIN. Enter 4 digits.");
      return;
    }

    if (pin !== correctPin) {
      setError("Incorrect PIN. Please try again.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const parsedAmount = parseInt(amount, 10);
      if (parsedAmount > 0 && parsedAmount <= currentBalance) {
        setCurrentBalance(currentBalance - parsedAmount);
        setTransactionStatus("success");
        setSlideInMessage(true);
        console.log("Payment successful!"); 
      } else {
        setTransactionStatus("error");
        setError("Transaction failed. Please try again.");
      }
    }, 2000);
  };

  const resetTransaction = () => {
    setSelectedOption(null);
    setSelectedContact(null);
    setPhoneNumber("");
    setWalletId("");
    setAmount("");
    setShowPinScreen(false);
    setPin("");
    setTransactionStatus(null);
    setSlideInMessage(false);
    setError("");
  };

  const handleOkButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="send-money-container">
      <div className="overall-container">
        {!loading && !selectedOption && (
          <div className="options-box">
            <button className="option-button" onClick={() => setSelectedOption("contacts")}>
              Pay Contacts
            </button>
            <button className="option-button" onClick={() => setSelectedOption("phone")}>
              Pay Phone Number
            </button>
            <button className="option-button" onClick={() => setSelectedOption("wallet")}>
              Pay by Wallet ID
            </button>
          </div>
        )}

        {!loading && selectedOption === "contacts" && !selectedContact && (
          <div className="contacts-container">
            <h3>Select Contact</h3>
            <input
              type="text"
              className="search-bar"
              placeholder="Search by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredContacts.length === 0 && <p className="error-message">Contact not found</p>}
            <ul>
              {filteredContacts.map((contact, index) => (
                <li key={index} className="contact-item" onClick={() => setSelectedContact(contact)}>
                  {contact.name} - {contact.number}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && selectedOption === "phone" && !showPinScreen && (
          <div className="phone-container">
            <h3>Enter Phone Number</h3>
            <input
              type="text"
              className="phone-number-input"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="number"
              className="amount-input"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button className="confirm-button" onClick={handleConfirmPayment}>
              Proceed
            </button>
          </div>
        )}

        {!loading && selectedOption === "wallet" && !showPinScreen && (
          <div className="wallet-container">
            <h3>Enter Wallet ID</h3>
            <input
              type="text"
              className="wallet-id-input"
              placeholder="Enter Wallet ID"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              maxLength={4} 
            />
            <input
              type="number"
              className="amount-input"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button className="confirm-button" onClick={handleConfirmPayment}>
              Proceed
            </button>
          </div>
        )}

        {!loading && selectedContact && !showPinScreen && (
          <div className="amount-container">
            <h3>Paying {selectedContact.name}</h3>
            <input
              type="number"
              className="amount-input"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button className="confirm-button" onClick={handleConfirmPayment}>
              Proceed
            </button>
          </div>
        )}

        {!loading && showPinScreen && (
          <div className="pin-container">
            <h3>Enter 4-Digit PIN</h3>
            <div className="pin-display">{pin.replace(/./g, "●")}</div>
            {error && <p className="error-message">{error}</p>}
            <button className="back-button" onClick={() => setShowPinScreen(false)}>
              Back
            </button>
            <button className="ok-button" onClick={handlePayment}>
              OK
            </button>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Processing Payment...</p>
          </div>
        )}

        {transactionStatus && !loading && (
          <div className={`transaction-message ${transactionStatus} ${slideInMessage ? "slide-in" : ""}`}>
            {transactionStatus === "success" && (
              <div className="transaction-success-box">
                <p>Payment Successful!</p>
                <button onClick={handleOkButtonClick}>OK</button>
              </div>
            )}
            {transactionStatus === "error" && (
              <div className="transaction-error-box">
                <p>Transaction Failed. Please try again.</p>
                <button onClick={resetTransaction}>Retry</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMoney;