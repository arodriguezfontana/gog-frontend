import e from "express";
export const searchRoutes = (tokenController, searchController) => {
  const router = e.Router();

  router.get("/", tokenController.checkRole("public"), (res, req) => searchController.search(res, req));

  return router;
};
