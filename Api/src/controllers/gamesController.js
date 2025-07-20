// Utils
import { toSimpleGameWithPrice, toSimpleGame, toSimpleCart, toGameDTO } from "./utils/dtos.js";
import { reviewBodySchema } from "./utils/validations.js";
import { ReviewException, PurchaseException, NotFoundUser, NotFoundGame } from "@unq-ui/gog-model-js/src/model/Exceptions.js";
import { ValidationError } from "yup";

/**
 * @class GamesController
 * @param {initGogSystem} gobService - Servicio para manejar todo .
 * @param {TokenController} tokenController - Servicio para manejo de autenticación.
*/

class GamesController {


  gobService = null;
  tokenController = null;
  
  constructor(gobService, tokenController) {
    this.gobService = gobService;
    this.tokenController = tokenController;
  }

  addReview = async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const validReview = await reviewBodySchema.validate(req.body);
      const newReview = {
        isRecommended: validReview.isRecommended,
        text: validReview.text,
        gameId: id
      };
      const game = this.gobService.addReview(userId, newReview);
      return res.status(200).json(toSimpleGame(game));
    } catch (error) {
      if (error instanceof ReviewException || error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof NotFoundGame || error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getAllGames = (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      if (page < 0) {
        return res.status(400).json({ error: "Wrong page number" });
      }
      const amount = parseInt(req.query.amount);
      const reqPage = this.gobService.getGames(page);
      let gamesList = reqPage.list.map(({ reviews, relatedGames, ...game }) => toSimpleGameWithPrice(game));

      if (amount || amount === 0) {
        gamesList = gamesList.slice(0, amount);
      }
      reqPage.list = gamesList;
      return res.status(200).json(reqPage);
    } catch (error) {
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getGameById = (req, res) => {
    try {
      const { game_id } = req.params;
      const game = this.gobService.getGame(game_id);
      return res.status(200).json(toGameDTO(game));
    } catch (error) {
      if (error instanceof NotFoundGame) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  removeGameFromCart = (req, res) => {
    try {
      const userId = req.user.id;
      const { game_id } = req.params;
      if (!game_id) {
        return res.status(404).json({ error: "Game not found" });
      }
      const cart = this.gobService.removeGameFromCart(userId, game_id);
      return res.status(200).json(toSimpleCart(cart));
    } catch (error) {

      switch (error.message) {
      case "Game is not in the cart":
        return res.status(404).json({ error: error.message });
      case "Cart is empty":
        return res.status(400).json({ error: error.message });
      case "Game not found":
        return res.status(404).json({ error: error.message });
      default:
        if (error.message === "invalid signature") {
          res.status(401).json({ error: error.message });
          return;
        }
        return res.status(500).json({ error: error.message });
      }
    }
  };

  addGameToCart = (req, res) => {
    try {
      const { game_id } = req.params;
      const userId = req.user.id;
      const cart = this.gobService.addGameToCart(userId, game_id);
      return res.status(200).json(toSimpleCart(cart));
    } catch (error) {
      if (error instanceof PurchaseException) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof NotFoundGame || error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getRecommendedGames = (req, res) => {
    try {
      const games = this.gobService.getRecommendedGames();
      return res.status(200).json(games.map(toSimpleGameWithPrice));
    } catch (error) {
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

}

export default GamesController;
