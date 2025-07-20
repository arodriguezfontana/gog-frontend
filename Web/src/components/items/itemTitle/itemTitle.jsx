import "./itemTitle.css";

const ItemTitle = ({children, colorText}) => {
  const wordClazz = colorText ? `navbar-word ${colorText}-color` : "navbar-word";

  return (
    <div className="navbar-item-container">
      <p className={wordClazz}>
        {children}
      </p>
      <span className='navbar-word-icon'>^</span>
    </div>
  );
};

export default ItemTitle;
