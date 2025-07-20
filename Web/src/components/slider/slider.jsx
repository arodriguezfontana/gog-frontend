import "./slider.css";
import { useRef, useEffect, useState } from "react";
import Button from "../button/button.jsx";
import CarouselSkeleton from "../placeHolderSkeletons/carouselSkeleton/carouselSkeleton.jsx";
import { APIException } from "../../services/exceptions.js";
import { useNavigate } from "react-router-dom";

const Slider = ({ CardComponent, initialCards = [], func, whiteArrow }) => {
  const sliderRef = useRef();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const SCROLL_AMOUNT = 300;
  const navigate = useNavigate();

  useEffect(() => {
    const slider = async () => {
      try {
        const response = await func();
        const cutCards = response.data.slice(0, 10);
        let combinedCards = cutCards.concat(initialCards);
        setCards(combinedCards);
      } catch (error) {
        if (error instanceof APIException) {
          navigate(error.path);
        }
      } finally {
        setLoading(false);
      }
    };
    slider();
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= SCROLL_AMOUNT;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += SCROLL_AMOUNT;
  };

  if (loading) {
    return (
      <div className="skeleton-slider">
        <CarouselSkeleton />
      </div>
    );
  }

  return (
    <div className="slider-container">
      <Button
        sliderButtonLeft={true}
        handleClick={() => scrollLeft()}
        aditionalClasses="slider-button"
        whiteArrow={whiteArrow}
      />
      <div className="slider-wrapper">
        <div className="slider-items-container" ref={sliderRef}>
          {cards.map((card, idx) => (
            <div className="slider-item" key={idx} >
              <CardComponent card={card} />
            </div>
          ))}
        </div>
      </div>
      <Button
        sliderButtonRight={true}
        handleClick={() => scrollRight()}
        aditionalClasses="slider-button"
        whiteArrow={whiteArrow}
      />
    </div>
  );
};

export default Slider;
