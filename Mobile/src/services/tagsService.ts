import axios, { AxiosResponse, AxiosError } from "axios";
import { throwCorrectException } from "./helper.js";
import { Tag } from "../types/tag.js";
axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL

export const getTags = async (): Promise<AxiosResponse<Tag[], Tag[]> | undefined> => {
  try {
    return await axios.get<Tag[]>("/tags");
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return undefined;
  }
};

export const getGamesByTagId = async (tagId: string | number, page: number = 1): Promise<Tag | undefined> => {
  try {
    const res = await axios.get(`/tags/${tagId}?page=${page}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throwCorrectException(error)
    }
    return undefined;
  }
};