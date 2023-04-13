import React, { useState } from "react";
import Image1 from "../assets/carouselImg1.png";
import Image2 from "../assets/carouselImg2.png";
import Image3 from "../assets/carouselImg3.png";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBulletClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      <div className="images-wrapper">
        <img
          src={Image1}
          className={`image img-1 ${activeIndex === 0 ? "show" : ""}`}
          alt="image1"
        />
        <img
          src={Image2}
          className={`image img-2 ${activeIndex === 1 ? "show" : ""}`}
          alt="image2"
        />
        <img
          src={Image3}
          className={`image img-3 ${activeIndex === 2 ? "show" : ""}`}
          alt="image3"
        />
      </div>
      <div className="text-slider">
        <div className="text-wrap">
          <div
            className="text-group"
            style={{ transform: `translateY(${-activeIndex * 2.2}rem)` }}
          >
            <h2>Universal Medical Record</h2>
            <h2>Track your full Medical Histroy</h2>
            <h2>HAPPY HEALTHY LIFE</h2>
          </div>
        </div>
        <div className="bullets">
          <span
            className={`bullet ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => handleBulletClick(0)}
          />
          <span
            className={`bullet ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => handleBulletClick(1)}
          />
          <span
            className={`bullet ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => handleBulletClick(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
