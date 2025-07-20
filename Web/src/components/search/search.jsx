import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "../../utils/debounce.js";
import "./search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const placeholder = "Search for games...";

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const updateQuery = useCallback(
    debounce((value) => {
      navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      updateQuery(value);
    }
  };

  return (
    <div id="search-container">
      <img src="/src/assets/icons/search-icon.svg" alt="" id="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        id="search"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
