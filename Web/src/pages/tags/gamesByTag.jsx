import GameList from "../../components/game/gameList/gameList.jsx";
import { useEffect, useState } from "react";
import { getGamesByTagId } from "../../services/tagsService.js";
import { useParams, useLocation } from "react-router-dom";
import { APIException } from "../../services/exceptions.js";
import { useNavigate } from "react-router-dom";

const GamesByTag = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { tagId } = useParams();
  const location = useLocation();
  const tagName = location.state?.tagName || "";
  const navigate = useNavigate();

  useEffect(() => {
    const games = async () => {
      try {
        const response = await getGamesByTagId(tagId, currentPage);
        setResults(response.list);
        setTotalPages(response.amountOfPages);
      } catch (error) {
        if (error instanceof APIException) {
          navigate(error.path);
        }
      } finally {
        setLoading(false);
      }
    };

    games();
  }, [tagId, currentPage, navigate]);

  const listTitle = `TAGS: ${tagName}`;

  return (
    <>
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

export default GamesByTag;
