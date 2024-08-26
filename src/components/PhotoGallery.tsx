import React from "react";
import Slider from "react-slick";
import "../styles/Carousel.css";

/* Images to be used in slider */
import image1 from "../assets/images/Loke1.jpg";
import image2 from "../assets/images/Loke2.jpg";
import image3 from "../assets/images/Loke3.jpg";
import image4 from "../assets/images/Loke4.jpg";
import image5 from "../assets/images/Loke5.jpg";
import image6 from "../assets/images/Loke6.jpg";
import image7 from "../assets/images/Loke7.jpg";
import image8 from "../assets/images/Loke8.jpg";
import image9 from "../assets/images/Loke9.jpg";
import image10 from "../assets/images/Loke10.jpg";
import image11 from "../assets/images/Stian1.jpg";

export default function PhotoGallery() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  // Using React Slick and Slick Carousel:
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={image1} alt="Slide 1" className="d-block w-100" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" className="d-block w-100" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" className="d-block w-100" />
        </div>
        <div>
          <img src={image4} alt="Slide 4" className="d-block w-100" />
        </div>
        <div>
          <img src={image5} alt="Slide 5" className="d-block w-100" />
        </div>
        <div>
          <img src={image6} alt="Slide 6" className="d-block w-100" />
        </div>
        <div>
          <img src={image7} alt="Slide 7" className="d-block w-100" />
        </div>
        <div>
          <img src={image8} alt="Slide 8" className="d-block w-100" />
        </div>
        <div>
          <img src={image9} alt="Slide 9" className="d-block w-100" />
        </div>
        <div>
          <img src={image10} alt="Slide 10" className="d-block w-100" />
        </div>
        <div>
          <img src={image11} alt="Slide 11" className="d-block w-100" />
        </div>
      </Slider>
    </div>
  );
}
