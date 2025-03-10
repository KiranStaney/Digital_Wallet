import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuBar.css"; 

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "kiran");
  const [email, setEmail] = useState(localStorage.getItem("email") || "kiran@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("9025826854");
  const [address, setAddress] = useState("123 Main St,Cbe,India");
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [currentPin, setCurrentPin] = useState("1234"); 
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleChangePin = () => {
    if (newPin === confirmPin && newPin.length === 4) {
      setCurrentPin(newPin);
      alert("PIN changed successfully!");
      setShowChangePin(false);
      setNewPin("");
      setConfirmPin("");
    } else {
      alert("PINs do not match or are invalid.");
    }
  };

  return (
    <div className="profile-container">
      {/* Circle Profile with First Letter */}
      <div className="profile-circle">
        {username.charAt(0).toUpperCase()}
      </div>

      {/* User Information */}
      <div className="profile-info">
        <div className="info-item">
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <span>{username}</span>
          )}
        </div>
        <div className="info-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{email}</span>
          )}
        </div>
        <div className="info-item">
          <label>Phone Number:</label>
          {isEditing ? (
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <span>{phoneNumber}</span>
          )}
        </div>
        <div className="info-item">
          <label>Address:</label>
          {isEditing ? (
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <span>{address}</span>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="profile-actions">
        {isEditing ? (
          <button className="save-button" onClick={handleSaveProfile}>
            Save Changes
          </button>
        ) : (
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        )}
      </div>

      {/* Change Password Section */}
      <div className="change-password-section">
        <button onClick={() => setShowChangePin(true)}>Change PIN</button>
        {showChangePin && (
          <div className="change-pin-form">
            <h3>Change PIN</h3>
            <input
              type="password"
              placeholder="New PIN (4 digits)"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              maxLength={4}
            />
            <input
              type="password"
              placeholder="Confirm New PIN"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              maxLength={4}
            />
            <button onClick={handleChangePin}>Save PIN</button>
            <button onClick={() => setShowChangePin(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;