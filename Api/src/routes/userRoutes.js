import express from "express";

export const userRoutes = (tokenController, userController) => {
  const router = express.Router();

  router.get("/current", tokenController.checkRole("user"), (req, res) => userController.getCurrentUser(req, res));
  router.get("/current/cart", tokenController.checkRole("user"), (req, res) => userController.getCart(req, res));
  router.get("/:id", tokenController.checkRole("public"), (req, res) => userController.getUser(req, res));
  router.get("/:id/reviews", tokenController.checkRole("public"), (req, res) => userController.getUserReviews(req, res));
  router.route("/:id/friends")
    .get(tokenController.checkRole("public"), (req, res) => userController.getFriends(req, res))
    .put(tokenController.checkRole("user"), (req, res) => userController.addOrRemoveFriend(req, res));

  return router;
};
