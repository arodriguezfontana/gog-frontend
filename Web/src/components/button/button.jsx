import "./button.css";
import { Link } from "react-router-dom";
/*
    buttonType: button - submit - reset (default is button)
    textColor: white - black (default is white)
    buttonColor: gray - green - violet (default is gray)
*/
const Button = ({ sliderButtonLeft, sliderButtonRight, aditionalClasses, handleClick, textColor, children, path, buttonColor, buttonType, whiteArrow }) => {
  const classes = `button 
    ${textColor ? textColor : "black"}
    ${buttonColor ? buttonColor : "gray"}
    ${aditionalClasses ? aditionalClasses : ""}`;

  const arrowColor = whiteArrow
    ? "/src/assets/icons/vector-w.png"
    : "/src/assets/icons/vector.png";

  const sliderLeftButtonClasses = `carousel-button prev ${aditionalClasses ? aditionalClasses : ""}`;
  const sliderRightButtonClasses = `carousel-button next ${aditionalClasses ? aditionalClasses : ""}`;

  const renderButton = () => (
    <button type={buttonType} className={classes} onClick={handleClick}>
      {children}
    </button>
  );

  const renderLink = () => (
    <Link type={buttonType} className={classes} onClick={handleClick} to={path}>
      {children}
    </Link>
  );

  if (sliderButtonLeft) {
    return (
      <button className={sliderLeftButtonClasses} onClick={handleClick}>
        <img src={arrowColor} alt="Prev" />
      </button>
    );
  }
  if (sliderButtonRight) {
    return (
      <button className={sliderRightButtonClasses} onClick={handleClick}>
        <img src={arrowColor} alt="Next" />
      </button>
    );
  }

  return (
    path
      ? renderLink()
      : renderButton()
  );
};

export default Button;