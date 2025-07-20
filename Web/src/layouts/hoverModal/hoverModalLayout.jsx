import ItemTitle from "../../components/items/itemTitle/itemTitle.jsx";
import "./hoverModalLayout.css";

const HoverModalLayout = ({ children, title, colorText }) => {
  return (
    <div className="hover-modal-wrapper">
      <div className="hover-trigger">
        <ItemTitle colorText={colorText}>{title}</ItemTitle>
      </div>
      <div className="hover-modal-layout">
        {children}
      </div>
    </div>
  );
};

export default HoverModalLayout;