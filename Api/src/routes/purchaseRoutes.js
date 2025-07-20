import e from "express";
export const purchaseRoutes = (tokenController, purchaseController) => {
  const router = e.Router();

  router.post("/", tokenController.checkRole("user"), (req, res) => purchaseController.buyItems(req, res));

  return router;
};
