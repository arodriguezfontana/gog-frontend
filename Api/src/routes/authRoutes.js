import express from "express";

export const authRoutes = (tokenController, userController) => {
  const router = express.Router();

  router.post("/register", tokenController.checkRole("public"), userController.register);
  router.post("/login", tokenController.checkRole("public"), userController.login);

  return router;
};
