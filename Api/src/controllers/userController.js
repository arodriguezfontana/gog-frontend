import { HEADER } from "../constants.js";
import { toSimpleUser, toSimpleCart, toSimpleGameWithPrice, toAuthUser, toSimpleReviewOfGame } from "./utils/dtos.js";
import { loginBodySchema, registerBodySchema } from "./utils/validations.js";
import { NotFoundUser, UserException } from "@unq-ui/gog-model-js/src/model/Exceptions.js";
import { ValidationError } from "yup";
/**
 * @class UserController
 * @param {initGogSystem} gobService - Servicio para manejar todo .
 * @param {TokenController} tokenController - Servicio para manejo de autenticación.
*/
class UserController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  getUserReviews = (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Must be a ID" });

      const userReviews = this.service.getUserReviews(id);

      const userSimpleReviews = userReviews.map((r) => toSimpleReviewOfGame(r));

      res.status(200).json(userSimpleReviews)
    } catch (error) {
      if (error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  }

  login = async (req, res) => {
    try {
      const { email, password } = await loginBodySchema.validate(req.body);
      const user = this.service.users.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = this.tokenController.generateToken(user.id);
      return res.header(HEADER, token).json(toAuthUser(user));
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  register = async (req, res) => {
    try {
      const newUser = await registerBodySchema.validate(req.body);
      const user = this.service.addNewUser(newUser);
      const token = this.tokenController.generateToken(user.id);
      return res.header(HEADER, token).json(toAuthUser(user));
    } catch (error) {
      if (error instanceof UserException || error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getCurrentUser = (req, res) => {
    try {
      const userId = req.user.id;
      const user = this.service.getUser(userId);
      return res.status(200).json(toSimpleUser(user));
    } catch (error) {
      if (error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getCart = (req, res) => {
    try {
      const userId = req.user.id;
      const cart = this.service.getCart(userId);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      return res.status(200).json(toSimpleCart(cart));
    } catch (error) {
      if (error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getUser = (req, res) => {
    const { id } = req.params;
    try {
      const user = this.service.getUser(id);
      return res.status(200).json(toSimpleUser(user));
    } catch (error) {
      if (error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getFriends = (req, res) => {
    try {
      const { id } = req.params;
      const user = this.service.getUser(id);
      return res.status(200).json(user.friends.map(toSimpleUser));
    } catch (error) {
      if (error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };

  addOrRemoveFriend = (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const updatedUser = this.service.addOrRemoveFriend(userId, id);
      const { friends, password, reviews, ...userWithoutPassword } = updatedUser;
      userWithoutPassword.games = userWithoutPassword.games.map(toSimpleGameWithPrice);
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof NotFoundUser) {
        return res.status(404).json({ error: error.message });
      }
      if (error instanceof UserException) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === "invalid signature") {
        res.status(401).json({ error: error.message });
        return;
      }
      return res.status(500).json({ error: error.message });
    }
  };
}

export default UserController;