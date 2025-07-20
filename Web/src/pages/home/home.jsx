import "./home.css";
import BigGameCard from "../../components/cards/bigGameCard/bigGameCard.jsx";
import Carousel from "../../components/carousel/carousel.jsx";
import Pagination from "../../components/pagination/pagination.jsx";
import InfoGame from "../../components/cards/infoGame/infoGame.jsx";
import Slider from "../../components/slider/slider.jsx";
import TagCard from "../../components/cards/tagCard/tagCard.jsx";
import PageSection from "../../layouts/pageSection/pageSection.jsx";
import { getTags } from "../../services/tagsService.js";
import { getRecommendedGames,getGames } from "../../services/gamesService.js";

const Home = () => {

  const cardData = {
    name: "SEE ALL TAGS",
    image: {
      src: "src/assets/images/see_all_tags.png",
      alt: "SEE ALL TAGS"
    }
  };

  return (
    <div id="home">
      <div className="home-wrapper">
        <section className="home-section">
          <PageSection title="FEATURED & RECOMMENDED">
            <Carousel
              CardComponent={BigGameCard}
              func={getRecommendedGames}
              cardPath="games"
            />
          </PageSection>
        </section>
        <section className="home-section">
          <PageSection title="BROWSE BY CATEGORY">
            <Slider
              CardComponent={TagCard}
              initialCards={[cardData]}
              func={getTags}
              cardPath="tags"
            />
          </PageSection>
        </section>
        <section className="home-section">
          <PageSection title="NEW & TRENDING">
            <Pagination
              CardComponent={InfoGame}
              useInfiniteScroll={true}
              func={getGames}
            />
          </PageSection>
        </section>
      </div>
    </div>
  );
};

export default Home;
