import axios, { AxiosError } from "axios";
import { throwCorrectException } from "./helper";
axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;
import { SearchGamesParams, SearchResponse } from "../types/search";

export const searchGames = async ({ query, page = 1 }: SearchGamesParams): Promise<SearchResponse> => {
  try {
    const res = await axios.get(`/search?page=${page}&query=${query}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throwCorrectException(error)
    }
    throw error;
  }
};
