import React, { useState } from "react";
import "./OffersAndRewards.css";

const OffersAndRewards = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      image: "https://cdn-icons-png.flaticon.com/128/1611/1611173.png",
      title: "Flat ₹100 Cashback",
      description: "Get ₹100 cashback on transactions above ₹500.",
      expiry: "Valid till March 15, 2025",
    },
    {
      id: 2,
      image: "https://cdn-icons-png.flaticon.com/128/1611/1611173.png",
      title: "10% Off on Food Orders",
      description: "Save 10% on your next food order with this offer.",
      expiry: "Expires in 3 days",
    },
    {
      id: 3,
      image: "https://cdn-icons-png.flaticon.com/128/1611/1611173.png",
      title: "5% Cashback on Utility Bills",
      description: "Earn 5% cashback when you pay electricity or water bills.",
      expiry: "Valid till March 18, 2025",
    },
    {
      id: 4,
      image: "https://cdn-icons-png.flaticon.com/128/1611/1611173.png",
      title: "5% Cashback on Utility Bills",
      description: "Earn 5% cashback when you pay electricity or water bills.",
      expiry: "Valid till March 27, 2025",
    },
    {
      id: 5,
      image: "https://cdn-icons-png.flaticon.com/128/1611/1611173.png",
      title: "5% Cashback on Utility Bills",
      description: "Earn 5% cashback when you pay electricity or water bills.",
      expiry: "Valid till March 30, 2025",
    },
    {
      id: 6,
      image: "https://cdn-icons-png.flaticon.com/128/1611/1611173.png",
      title: "5% Cashback on Utility Bills",
      description: "Earn 5% cashback when you pay electricity or water bills.",
      expiry: "Valid till March 28, 2025",
    },
  ]);

  const [rewards, setRewards] = useState([
    { id: 1, amount: "₹50 Cashback", status: "Claimed" },
  ]);

  const [expandedOfferId, setExpandedOfferId] = useState(null);

  const handleCardClick = (id) => {
    setExpandedOfferId(expandedOfferId === id ? null : id);
  };

  const handleRedeem = (offer) => {
    setOffers(offers.filter((o) => o.id !== offer.id));
    setRewards([...rewards, { id: rewards.length + 1, amount: offer.title, status: "Claimed" }]);
  };

  return (
    <div className="offers-rewards-container">
      <div className="offers-section">
        <h2>Active Offers</h2>
        <div className="offers-list">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`offer-card ${expandedOfferId === offer.id ? "expanded" : ""}`}
              onClick={() => handleCardClick(offer.id)}
            >
              <img src={offer.image} alt={offer.title} className="offer-image" />
              <div className="offer-details">
                <h4>{offer.title}</h4>
                <p>{offer.description}</p>
                <p className="offer-expiry">{offer.expiry}</p>
                {expandedOfferId === offer.id && (
                  <button
                    className="redeem-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRedeem(offer);
                    }}
                  >
                    Redeem
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rewards-section">
        <h3>Earned Rewards</h3>
        <ul className="rewards-list">
          {rewards.map((reward) => (
            <li key={reward.id} className="reward-item">
              {reward.amount} - <span className="reward-status">{reward.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OffersAndRewards;