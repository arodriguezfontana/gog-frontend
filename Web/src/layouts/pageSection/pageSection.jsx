import "./pageSection.css";
import TitleH2 from "../../components/titleH2/titleH2.jsx";

const PageSection = ({ children, title, mouseEnter, mouseLeave }) => {
  return (
    <div className="general-container" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div className='general-wrapper'>
        <article className="general-content">
          <TitleH2>{title}</TitleH2>
          {children}
        </article>
      </div>
    </div>
  );
};

export default PageSection;
