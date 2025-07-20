const toSimpleGame = ({ id, name, mainImage, tags }) => ({ id, name, mainImage: mainImage.url, tags });
const toCorrectPriceFormat = ({ currency, amount }) => ({ amount, currency });
const toSimpleReviewOfGame = ({ id, user, game, isRecommended, text }) => ({ id, user: toSimpleUser(user), game: toSimpleGame(game), isRecommended, text });
const toSimpleGameWithPrice = ({ id, name, mainImage, tags, price }) => ({
  id,
  name,
  mainImage: mainImage.url,
  tags,
  price: {
    amount: price.amount,
    currency: price.currency
  }
});

const toSimpleUser = (user) => {
  const { id, email, name, image, backgroundImage, games } = user;
  return {
    id,
    email,
    name,
    image,
    backgroundImage,
    games: games.map(toSimpleGame)
  }
};

const toGameDTO = (game) => {
  const { mainImage, price, reviews, relatedGames, ...newGame } = game;
  return {
    ...newGame,
    mainImage: mainImage.url,
    relatedGames: relatedGames.map((g) => toSimpleGameWithPrice(g)),
    reviews: reviews.map((g) => toSimpleReviewOfGame(g)),
    price: toCorrectPriceFormat(price)
  };
};

const toSimpleCart = (cart) => ({
  games: cart.games.map((g) => toSimpleGameWithPrice(g)),
  user: toSimpleUser(cart.user),
});

const toAuthUser = (user) => {
  const { friends, password, ...newuser } = user;
  newuser.games = newuser.games.map((g) => toSimpleGameWithPrice(g));
  return newuser;
};

export { toSimpleUser, toSimpleGame, toSimpleGameWithPrice, toSimpleCart, toGameDTO, toAuthUser, toSimpleReviewOfGame };