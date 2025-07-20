import "./searchResultSkeleton.css";

const SearchResultSkeleton = () => {
  return (
    <div className="search-result-skeleton-container">
      <div className="search-result-skeleton">
        <div className="search-result-img"></div>
        <div className="search-result-text-container">
          <div className="search-result-title"></div>
          <div className="search-result-tags"></div>
        </div>
      </div>
      <div className="search-light"></div>
    </div>

  );
};

export default SearchResultSkeleton;
