import e from "express";
export const gamesRoutes = (tokenController, gamesController) => {
  const router = e.Router();

  router.get("/", tokenController.checkRole("public"), (req, res) => gamesController.getAllGames(req, res));
  router.get("/recommended", tokenController.checkRole("public"), (req, res) => gamesController.getRecommendedGames(req, res));
  router.put("/:id/reviews", tokenController.checkRole("user"), (req, res) => gamesController.addReview(req, res));
  router.route("/:game_id")
    .get(tokenController.checkRole("public"), (req, res) => gamesController.getGameById(req, res))
    .put(tokenController.checkRole("user"), (req, res) => gamesController.addGameToCart(req, res))
    .delete(tokenController.checkRole("user"), (req, res) => gamesController.removeGameFromCart(req, res));

  return router;
};
