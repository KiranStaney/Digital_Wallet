import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./dashboard.css";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleFeedbackClick = () => {
    navigate("/feedback");
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="dashboard-container">
      {/* Menu Bar */}
      <div className="menu-bar">
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`menu-content ${isMenuOpen ? "open" : ""}`}>
          <div className="menu-close" onClick={toggleMenu}>
            &#10094;
          </div>
          <div className="menu-item" onClick={handleProfileClick}>
            Profile
          </div>
          <div className="menu-item" onClick={handleAboutClick}>
            About
          </div>
          <div className="menu-item" onClick={handleFeedbackClick}>
            Feedback
          </div>
          <div className="menu-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>

      {/* Slider for Ads/Images */}
      <div className="slider-container">
        <Slider {...sliderSettings}>
          <div>
            <img
              src="https://www.shutterstock.com/image-vector/money-transfer-online-global-mobile-260nw-2170434649.jpg"
              alt="Ad 1"
              className="slider-image"
            />
          </div>
          <div>
            <img
              src="https://geniusee.com/storage/app/media/blog/blog230_wallets_you_should_know/top_digital_wallets_pv.png"
              alt="Ad 2"
              className="slider-image"
            />
          </div>
          <div>
            <img
              src="https://blog.jeton.com/wp-content/uploads/2021/11/future-of-digital-wallets.png"
              alt="Ad 3"
              className="slider-image"
            />
          </div>
        </Slider>
      </div>

      {/* Grid Container */}
      <div className="grid-container">
        {[
          {
            path: "/current-balance",
            img: "https://cdn1.iconfinder.com/data/icons/banking-36/128/banking__bank_building_finance_column-64.png",
            label: "Current Balance",
          },
          {
            path: "/sendmoney",
            img: "https://cdn3.iconfinder.com/data/icons/customer-support-24/64/service-charge-extra-money-online-64.png",
            label: "Send Money",
          },
          {
            path: "/receive-money",
            img: "https://cdn2.iconfinder.com/data/icons/finance-hand-drawn/56/earning_finance_icon-256.png",
            label: "Receive Money",
          },
          {
            path: "/transaction-history",
            img: "https://cdn4.iconfinder.com/data/icons/transaction-21/64/Document-256.png",
            label: "Transaction History",
          },
          {
            path: "/pay-bills",
            img: "https://cdn3.iconfinder.com/data/icons/fin-tech-elements/67/9-64.png",
            label: "Pay Bills",
          },
          {
            path: "/offers-rewards",
            img: "https://cdn1.iconfinder.com/data/icons/shopping-and-e-commerce-151/52/Voucher_promotion_redeemable_offers_coupon-64.png",
            label: "Offers & Rewards",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="grid-item"
            onClick={() => navigate(item.path)}
          >
            <img className="grid-image" src={item.img} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;