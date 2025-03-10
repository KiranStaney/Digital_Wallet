import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./FrontPage";
import Login from "./Login";
import SignUp from "./SignUp"; 
import Dashboard from "./Dashboard";
import CurrentBalance from "./CurrentBalance";
import SendMoney from "./SendMoney";
import ReceiveMoney from "./ReceiveMoney";
import TransactionHistory from "./TransactionHistory";
import OffersAndRewards from "./OffersAndRewards";
import PayBills from "./PayBills";
import Profile from "./Profile";
import About from "./About";
import FeedbackForm from "./FeedbackForm";

function App() {
  const [currentBalance, setCurrentBalance] = useState(5000);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/current-balance" element={<CurrentBalance />} />
        <Route
          path="/sendmoney"
          element={
            <SendMoney
              currentBalance={currentBalance}
              setCurrentBalance={setCurrentBalance}
            />
          }
        />
        <Route path="/receive-money" element={<ReceiveMoney />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/offers-rewards" element={<OffersAndRewards />} />
        <Route path="/pay-bills" element={<PayBills />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<FeedbackForm/>} />
      </Routes>
    </Router>
  );
}

export default App;