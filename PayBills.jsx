import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PayBills.css";

const billCategories = [
  {
    name: "Mobile Recharge",
    path: "mobile-recharge",
    icon: "https://cdn-icons-png.flaticon.com/128/15238/15238260.png",
  },
  {
    name: "Electricity",
    path: "electricity",
    icon: "https://cdn-icons-png.flaticon.com/128/11195/11195893.png",
  },
  {
    name: "Cable TV",
    path: "cable-tv",
    icon: "https://cdn-icons-png.flaticon.com/128/1866/1866577.png",
  },
  {
    name: "Postpaid Mobile",
    path: "postpaid-mobile",
    icon: "https://cdn-icons-png.flaticon.com/128/14268/14268074.png",
  },
];

const packages = [
  { id: 1, name: "Package 1", cost: 100 },
  { id: 2, name: "Package 2", cost: 200 },
  { id: 3, name: "Package 3", cost: 300 },
];

const PayBills = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [consumerId, setConsumerId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pin, setPin] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState("category");
  const [searchTerm, setSearchTerm] = useState("");

  const correctPin = "1234"; 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setError("");
    setConsumerId("");
    setPhoneNumber("");
    setAmount("");
    setSelectedPackage(null);
    setPin("");
    setPaymentSuccess(false);
    setCurrentStep("details");
  };

  const handleConsumerIdSubmit = () => {
    if (consumerId.length !== 5 || isNaN(consumerId)) {
      setError("Consumer ID must be a 5-digit number.");
      return;
    }
   
    setAmount(selectedCategory === "cable-tv" ? "300" : "500");
    setCurrentStep("confirm");
  };

  const handlePackageSelect = (pkg) => {
    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setSelectedPackage(pkg);
    setAmount(pkg.cost);
    setCurrentStep("confirm");
  };

  const handlePayment = () => {
    if (pin.length !== 4 || isNaN(pin)) {
      setError("PIN must be a 4-digit number.");
      return;
    }

  
    if (pin !== correctPin) {
      setError("Incorrect PIN. Please try again.");
      return;
    }

    setTimeout(() => {
      setPaymentSuccess(true);
      setCurrentStep("success");
    }, 1000);
  };

  const selectedBillCategory = billCategories.find(
    (bill) => bill.path === selectedCategory
  );

  const filteredPackages = packages.filter((pkg) =>
    pkg.cost.toString().includes(searchTerm)
  );

  return (
    <div className="pay-bills">
      {currentStep === "category" && (
        <div className="bill-category-options">
          <h2>Select Bill Category</h2>
          <div className="category-grid">
            {billCategories.map((bill) => (
              <div
                key={bill.path}
                className="category-card"
                onClick={() => handleCategorySelect(bill.path)}
              >
                <img src={bill.icon} alt={bill.name} />
                <p>{bill.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStep === "details" && (
        <div className="bill-payment-form">
          {selectedCategory === "electricity" || selectedCategory === "cable-tv" ? (
            <>
              <h2>
                {selectedCategory === "electricity"
                  ? "Electricity Bill Payment"
                  : "Cable TV Bill Payment"}
              </h2>
              <input
                type="text"
                placeholder="Enter Consumer ID"
                value={consumerId}
                onChange={(e) => setConsumerId(e.target.value)}
              />
              {error && <div className="error-message">{error}</div>}
              <button onClick={handleConsumerIdSubmit}>OK</button>
            </>
          ) : (
            <>
              <h2>
                {selectedCategory === "mobile-recharge"
                  ? "Mobile Recharge"
                  : "Postpaid Mobile"}
              </h2>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setPhoneNumber(e.target.value);
                  }
                }}
              />
              {error && <div className="error-message">{error}</div>}
              <input
                type="text"
                placeholder="Search by cost"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
              <div className="package-list">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`package-item ${
                      selectedPackage?.id === pkg.id ? "selected" : ""
                    }`}
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    {pkg.name} - RS.{pkg.cost}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {currentStep === "confirm" && (
        <div className="bill-payment-form">
          <h2>Confirm Payment</h2>
          {selectedBillCategory && <p>Category: {selectedBillCategory.name}</p>}
          {selectedCategory === "electricity" || selectedCategory === "cable-tv" ? (
            <p>Consumer ID: {consumerId}</p>
          ) : (
            <p>Phone Number: {phoneNumber}</p>
          )}
          <p>Amount: RS.{amount}</p>
          <div className="button-group">
            <button onClick={() => setCurrentStep("details")}>Back</button>
            <button 
              onClick={() => {
                setError(""); 
                setCurrentStep("pin");
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {currentStep === "pin" && (
        <div className="bill-payment-form">
          <h2>Enter 4-Digit PIN</h2>
          <input
            type="password"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="pin-input"
          />
          {error && <div className="error-message">{error}</div>}
          <button onClick={handlePayment} className="submit-button">Submit</button>
        </div>
      )}

      {currentStep === "success" && (
        <div className="bill-payment-form">
          <h2>Payment Successful!</h2>
          <p>Thank you for your payment.</p>
        </div>
      )}
    </div>
  );
};

export default PayBills;