import axios from "axios";
import { throwCorrectException } from "./helper.js";

export const getTags = async () => {
  try {
    return await axios.get("api/tags");
  } catch (err) {
    throwCorrectException(err);
  }
};

export const getGamesByTagId = async (tagId, page = 1) => {
  try {
    const res = await axios.get(`/api/tags/${tagId}?page=${page}`);
    return res.data;
  } catch (error) {
    throwCorrectException(error);
  }
};