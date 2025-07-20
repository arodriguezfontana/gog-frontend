import "./searchPagination.css";

const searchPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      {totalPages > 1 && currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-button prev-button"
        >
          previous
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          className="pagination-button"
        >
          {page}
        </button>
      ))}

      {totalPages > 1 && currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-button next-button"
        >
          next
        </button>
      )}
    </div>
  );
};

export default searchPagination;
