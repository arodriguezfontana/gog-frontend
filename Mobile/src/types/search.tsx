import { Game } from "./game";

export type SearchResponse = {
  amountOfElements: number;
  amountOfPages: number;
  currentPage: string;
  games: Game[];
};

export type SearchGamesParams = {
  query: string;
  page: number;
};