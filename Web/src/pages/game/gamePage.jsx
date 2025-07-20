import "./gamePage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameBannerInfo from "../../components/game/gameBannerInfo/gameBannerInfo.jsx";
import GameBuyCard from "../../components/game/gameBuyCard/gameBuyCard.jsx";
import GameGallery from "../../components/game/gameGallery/gameGallery.jsx";
import GameReviews from "../../components/game/gameReviews/gameReviews.jsx";
import GameWithUserReview from "../../components/game/gameReviews/gameWithUserReview/gameWithUserReview.jsx";
import GameWithAddReview from "../../components/game/gameReviews/gameWithAddReview/gameWithAddReview.jsx";
import PageSection from "../../layouts/pageSection/pageSection.jsx";
import Slider from "../../components/slider/slider.jsx";
import GameCard from "../../components/cards/gameCard/gameCard.jsx";
import { getGameById } from "../../services/gamesService.js";
import { getCurrentUser } from "../../services/userService.js";
import Spinner from "../../components/spinner/spinner.jsx";
import { APIException } from "../../services/exceptions.js";

const GamePage = () => {

  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [sliderKey, setSliderKey] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const reloadGame = async () => {
    try {
      const game = await getGameById(gameId);
      setGame(game);
      setSliderKey(prev => prev + 1);
    } catch (err) {
      if (err instanceof APIException) {
        navigate(err.path);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    getCurrentUser()
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(err => {
        if (err instanceof APIException) {
          navigate(err.path);
        }
      });
    reloadGame();

  }, [gameId]);

  if (loading) return <Spinner />;

  const currentUserReview = currentUser
    ? game.reviews.find(r => r.user?.id === currentUser.id)
    : null;

  const currentUserOwnsGame = currentUser
    ? currentUser.games?.some(g => g.id === game.id)
    : false;

  return (
    <div id="game">
      <div className="game-wrapper">

        <section className="game-section">
          <GameBannerInfo
            name={game.name}
            mainImage={game.mainImage}
            developerName={game.developer.name}
            website={game.website}
            releaseDate={game.releaseDate}
            tags={game.tags}
            multimedia={game.multimedia.map(multimedia => multimedia.url)}
          />
        </section>

        {(!currentUser || !currentUserOwnsGame) && (
          <section className="game-section">
            <GameBuyCard
              name={game.name}
              amount={game.price.amount}
              currency={game.price.currency}
              id={game.id}
              user={currentUser}
              game={game}
            />
          </section>
        )}

        <section className="game-section">
          <GameGallery
            multimedia={game.multimedia}
            name={game.name}
          />
        </section>

        <section className="game-section">
          <PageSection title="ABOUT THIS GAME">
            <div className="page-section-content">
              <p>{game.description}</p>
            </div>
          </PageSection>
        </section>

        <section className="game-section">
          <PageSection title="REQUIREMENTS">
            <div className="page-section-content">
              <p><strong>OS: </strong>{game.requirement.os}</p>
              <p><strong>Processor: </strong>{game.requirement.processor}</p>
              <p><strong>Memory: </strong>{game.requirement.memory}</p>
              <p><strong>Graphics: </strong>{game.requirement.graphics}</p>
            </div>
          </PageSection>
        </section>

        <section className="game-section">
          <PageSection title="RELATED GAMES">
            <Slider
              key={sliderKey}
              CardComponent={GameCard}
              initialCards={game.relatedGames}
              func={() => Promise.resolve({ data: [] })}
              cardPath="games"
              whiteArrow={true}
            />
          </PageSection>
        </section>

        <section className="game-section">
          <PageSection title="REVIEWS">
            {currentUser && currentUserOwnsGame && !currentUserReview && (
              <GameWithAddReview
                user={currentUser}
                gameId={gameId}
                onReviewAdded={reloadGame}
              />
            )}
            {currentUser && currentUserOwnsGame && currentUserReview && (
              <GameWithUserReview
                user={currentUser}
                userReview={currentUserReview}
              />
            )}
            <GameReviews
              reviews={game.reviews}
            />
          </PageSection>
        </section>

      </div>
    </div>
  );
};

export default GamePage;