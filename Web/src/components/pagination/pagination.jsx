// styles
import "./pagination.css";
// components
import Button from "../button/button.jsx";
import InfoCardSkeleton from "../placeHolderSkeletons/infoCardSkeleton/infoCardSkeleton.jsx";
//hooks
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// exceptions
import { APIException } from "../../services/exceptions.js";

function Pagination({ CardComponent, LoadingComponent = InfoCardSkeleton, useInfiniteScroll = false, usePagination = false, initialAmount = 10, func, cardPath, useAnimation = true, useGrid = true, lastMessage = "No more content to load" }) {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    list: [],
    amountOfPages: 0,
    amountOfElements: 80
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [amount, setAmount] = useState(initialAmount);
  const [loadMore, setLoadMore] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const isThrottled = useRef(false);
  const navigate = useNavigate();

  const gamesCardsContainer = `games-cards-container ${useGrid ? "grid" : "flex"}`;

  useEffect(() => {
    const pag = async () => {
      try {
        let list = [];
        const { data } = await func(currentPage);
        if (data.games) {
          setCards(data.games);
          setAllCards(data.games);
          return;
        }

        if (useInfiniteScroll) {
          setPagination(data);
          list = cards.concat(data.list);
        } else {
          setAllCards(data);
          list = data.slice(0, amount);
        }
        if (cardPath) {
          list = list.map((card) => ({ ...card, href: card.id ? `/${cardPath}/${card.id}` : `/${cardPath}` }));
        }
        setCards(list);
      } catch (err) {
        if (err instanceof APIException) {
          navigate(err.path);
        }
      } finally {
        setLoading(false);
      }
    };
    pag();
  }, [currentPage]);

  useEffect(() => {
    setCards(allCards.slice(0, amount));
    setLoading(false);
  }, [loadMore]);

  const loadMorePages = () => {
    if (amount != cards.length) {
      setShowButton(false);
      return;
    }
    setAmount((prevAmount) => Math.max(cards.length, prevAmount + initialAmount));
    setLoadMore(!loadMore);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 500) {
        if (!isThrottled.current && currentPage < pagination.amountOfPages) {
          isThrottled.current = true;
          setCurrentPage((prevPage) => prevPage + 1);
          setTimeout(() => {
            isThrottled.current = false;
          }, 300);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, pagination.amountOfPages]);

  if (loading) {
    return (
      <div className={gamesCardsContainer}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="card-component-container">
            <LoadingComponent />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pagination-container">
      <section className={gamesCardsContainer}>
        {cards.map((card, index) => (
          <div className='card-component-container' key={index}>
            <div className={useAnimation ? "card" : ""}>
              <CardComponent card={card} />
            </div>
          </div>
        ))}
        {(!useInfiniteScroll && usePagination && showButton) ? (
          <section className="load-more-container">
            <div className='load-more-text'>
              <Button
                handleClick={() => loadMorePages()}
                buttonColor="violet"
              >
                See More
              </Button>
            </div>
          </section>
        ) : (
          <div className="pagination-no-more-content-container">
            <p className="pagination-no-more-content-msg">{lastMessage}</p>
          </div>
        )}
      </section>
      {useInfiniteScroll && currentPage === pagination.amountOfPages && (
        <div className="pagination-no-more-content-container">
          <p className="pagination-no-more-content-msg">{lastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Pagination;