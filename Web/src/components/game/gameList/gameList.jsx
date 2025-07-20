import "./gameList.css";
import SearchPagination from "../../search/searchPagination.jsx";
import GameCardList from "../../cards/gameCardList/gameCardList.jsx";
import { useEffect } from "react";
import Spinner from "../../spinner/spinner.jsx";

const GameList = ({
  loading,
  listTitle,
  games,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="game-list-container">
      {loading && <Spinner />}
      {!loading && games.length > 0 && (
        <>
          <div className="game-list-wrapper">
            <h2 className="game-list-title">{`${listTitle}`}</h2>
            <div className="game-list">
              {games.map((res) => (
                <GameCardList key={res.name} card={res} />
              ))}
            </div>
            {totalPages > 1 && (
              <SearchPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GameList;
