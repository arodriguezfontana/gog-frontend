import "./searchResults.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchGames } from "../../services/searchService.js";
import GameList from "../../components/game/gameList/gameList.jsx";
import { useNavigate } from "react-router-dom";
import { APIException } from "../../services/exceptions.js";
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const listTitle = `SEARCH: ${query}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const search = async () => {
      try {
        const response = await searchGames(query, currentPage);
        setResults(response.games);
        setTotalPages(response.amountOfPages);
      } catch (error) {
        if (error instanceof APIException) {
          navigate(error.path);
        }
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query, currentPage]);

  return (
    <>
      {!loading && results.length === 0 && (
        <div className="no-results">
          No results found for: <strong>{query}</strong>
        </div>
      )}
      <GameList
        loading={loading}
        listTitle={listTitle}
        games={results}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default SearchResults;
