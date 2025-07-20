import axios, { AxiosError, AxiosResponse } from "axios";
import { throwCorrectException } from "./helper";
import { User } from "../types/user";
axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL
import { Id } from "../types/utils";
import { Review } from "../types/review";

export async function loginUser(email: string, password: string): Promise<{ token: string | null; user: User }> {
  try {
    const response = await axios.post("/login", {
      email,
      password,
    });
    return { token: response.headers.authorization, user: response.data };
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    throw err;
  }
}
export async function getCurrentUser(token: string | null): Promise<AxiosResponse<User> | undefined> {
  try {
    const res = await axios.get("/users/current", {
      headers: {
        authorization: token
      }
    });
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return Promise.resolve(undefined);
  }
}

export async function getUserById(id: Id): Promise<AxiosResponse<User> | undefined> {
  try {
    return await axios.get(`/users/${id}`);
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return Promise.resolve(undefined);
  }
}

export async function addOrRemoveFriend(id: Id, token: string | null): Promise<AxiosResponse<User> | undefined> {
  try {
    const res = await axios.put(`/users/${id}/friends`,
      {},
      {
        headers: {
          authorization: token
        }
      }
    );
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return undefined;
  }
}

export async function getUserFriends(id: Id): Promise<User[] | undefined> {
  try {
    const { data } = await axios.get(`/users/${id}/friends`);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return undefined;
  }
}

export function getUserReviews(id: Id): Promise<AxiosResponse<Review[], undefined> | undefined> | undefined {
  try {
    return axios.get(`/users/${id}/reviews`);
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return undefined;
  }
}
