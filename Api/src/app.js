import express from "express";
import cors from "cors";
import { initGogSystem } from "@unq-ui/gog-model-js";
// controllers
import UserController from "./controllers/userController.js";
import TokenController from "./controllers/tokenController.js";
import GamesController from "./controllers/gamesController.js";
import PurchaseController from "./controllers/purchaseController.js";
import SearchController from "./controllers/searchController.js";
import TagsController from "./controllers/tagsController.js";
// routes
import { userRoutes } from "./routes/userRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { gamesRoutes } from "./routes/gamesRoutes.js";
import { purchaseRoutes } from "./routes/purchaseRoutes.js";
import { searchRoutes } from "./routes/searchRoutes.js";
import { tagsRoutes } from "./routes/tagsRoutes.js";

const gogSystem = initGogSystem();
const tokenController = new TokenController(gogSystem);
const userController = new UserController(gogSystem, tokenController);
const gamesController = new GamesController(gogSystem, tokenController);
const purchaseController = new PurchaseController(gogSystem, tokenController);
const searchController = new SearchController(gogSystem, tokenController);
const tagsController = new TagsController(gogSystem);


const app = express();
const port = 3000;
app.use(cors({ origin: '*'}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes(tokenController, userController));
app.use("/users", userRoutes(tokenController, userController));
app.use("/games", gamesRoutes(tokenController, gamesController));
app.use("/purchase", purchaseRoutes(tokenController, purchaseController));
app.use("/search", searchRoutes(tokenController, searchController));
app.use("/tags", tagsRoutes(tokenController, tagsController));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});