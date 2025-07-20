import { useState, useEffect, useRef } from "react";
import "./carousel.css";
import Button from "../button/button.jsx";
import CarouselSkeleton from "../placeHolderSkeletons/carouselSkeleton/carouselSkeleton.jsx";
import { APIException } from "../../services/exceptions.js";
import { useNavigate } from "react-router-dom";
const Carousel = ({ initialAutoPlay = true, CardComponent, func, cardPath }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(initialAutoPlay);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    func().
      then((response) => {
        if (cardPath) {
          response.data = response.data.map((card) =>
            ({ ...card, href: card.id ? `/${cardPath}/${card.id}` : `/${cardPath}` }));
        }
        setComponents(response.data);
        setLoading(false);
      }).catch((error) => {
        if (error instanceof APIException) {
          navigate(error.path);
        }
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + components.length) % components.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % components.length
    );
  };

  useEffect(() => {
    if (autoPlay && components.length > 0) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [autoPlay, components.length]);

  const handleMouseEnter = () => setAutoPlay(false);
  const handleMouseLeave = () => setAutoPlay(true);

  if (loading) {
    return (
      <CarouselSkeleton />
    );
  }

  return (
    <div className="carousel-general-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="carousel-inner">
        <div className="carousel-container">
          {components.map((component, index) => (
            <div
              className={`carousel-item ${index === currentIndex ? "active" : ""}`}
              key={index}
            >
              <CardComponent card={component} />
            </div>
          ))}
        </div>
        <Button sliderButtonRight={true} handleClick={handleNext} />
        <Button sliderButtonLeft={true} handleClick={handlePrev} />
      </div>
      <section className="carousel-index-container">
        <div className="carousel-index-wrapper">
          {components.map((_, index) => (
            <div
              key={index}
              className={`index-box ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </section>
    </div>);
};
export default Carousel;
