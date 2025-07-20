import axios from "axios";
import { throwCorrectException } from "./helper";
export const searchGames = async (game, page = 1) => {
  try {
    const res = await axios.get(`/api/search?page=${page}&query=${game}`);
    return res.data;
  } catch (error) {
    throwCorrectException(error);
  }
};