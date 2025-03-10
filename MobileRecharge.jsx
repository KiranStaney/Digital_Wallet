import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateMobileNumber, handlePinVerification } from "./BillFunctions";

const MobileRecharge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [plans] = useState([
    { id: 1, amount: 199, details: "1GB/day for 28 days" },
    { id: 2, amount: 399, details: "1.5GB/day for 56 days" },
    { id: 3, amount: 599, details: "2GB/day for 84 days" },
  ]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pin, setPin] = useState("");
  const [step, setStep] = useState(1);
  const correctPin = "1234";

  const handleNext = () => {
    if (!validateMobileNumber(mobileNumber)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const handleTransaction = () => {
    handlePinVerification(pin, correctPin, () => {
      setStep(4);
    });
  };

  return (
    <div className="bill-payment-container">
      {step === 1 && (
        <>
          <h3>Enter Mobile Number</h3>
          <input type="text" maxLength="10" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="input-field" />
          <button onClick={handleNext} className="payment-button">Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Select a Plan</h3>
          {plans.map((plan) => (
            <div key={plan.id} className="bill-category" onClick={() => setSelectedPlan(plan)}>
              <span className="bill-category-name">₹{plan.amount} - {plan.details}</span>
            </div>
          ))}
          <button onClick={handleConfirm} className="payment-button" disabled={!selectedPlan}>Confirm</button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Enter 4-Digit PIN</h3>
          <input type="password" maxLength="4" value={pin} onChange={(e) => setPin(e.target.value)} className="pin-input" />
          <button onClick={handleTransaction} className="payment-button">Pay</button>
        </>
      )}

      {step === 4 && (
        <>
          <h3>Transaction Successful</h3>
          <button onClick={() => navigate("/")} className="payment-button">OK</button>
        </>
      )}
    </div>
  );
};

export default MobileRecharge;
