import e from "express";
export const tagsRoutes = (tokenController, tagsController) => {
  const router = e.Router();

  router.get("/", tokenController.checkRole("public"), (req, res) => tagsController.getTags(req, res));
  router.get("/:id", tokenController.checkRole("public"), (req, res) => tagsController.getGamesByTag(req, res));

  return router;
};