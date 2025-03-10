import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuBar.css";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState(""); 
  const [feedbacks, setFeedbacks] = useState([]); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      alert("Please enter some feedback before submitting.");
      return;
    }
    setFeedbacks([...feedbacks, feedback]); 
    setFeedback(""); 
  };

  const handleCancel = () => {
    navigate("/dashboard"); 
  };

  return (
    <div className="feedback-page">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <div className="feedback-buttons">
          <button type="submit">OK</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>

      {/* Display all feedbacks */}
      <div className="feedback-list">
        <h3>Previous Feedbacks</h3>
        {feedbacks.length === 0 ? (
          <p>No feedbacks yet. Be the first to share your thoughts!</p>
        ) : (
          feedbacks.map((fb, index) => (
            <div key={index} className="feedback-item">
              <p>{fb}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;