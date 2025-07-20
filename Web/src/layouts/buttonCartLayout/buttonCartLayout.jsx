import "./buttonCartLayout.css";

const ButtonCartLayout = ({ func, show, text }) => {

  if (!show) return <></>;

  return (<>
    <button onClick={func} className="buttonCartLayout">{text}</button>
  </>
  );

};

export default ButtonCartLayout;
