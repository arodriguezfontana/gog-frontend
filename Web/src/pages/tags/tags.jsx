import "./tags.css";
import Pagination from "../../components/pagination/pagination.jsx";
import TagCard from "../../components/cards/tagCard/tagCard.jsx";
import PageSection from "../../layouts/pageSection/pageSection.jsx";
import { getTags } from "../../services/tagsService.js";

const Tags = () => {

  return (
    <div className="tags-page">
      <div className="tags-page-container">
        <PageSection title="BROWSE BY CATEGORY">
          <Pagination
            CardComponent={TagCard}
            func={getTags}
            usePagination={true}
            initialAmount={60}
          >
          </Pagination>
        </PageSection>
      </div>
    </div>

  );
};

export default Tags;
