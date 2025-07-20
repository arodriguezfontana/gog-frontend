import axios from "axios";
import { saveUser, getUser } from "./token";
import { throwCorrectException } from "./helper";

export async function registerUser(username, email, password, image, backgroundImage) {
  try {
    const response = await axios.post("api/register", {
      name: username,
      email,
      password,
      image,
      backgroundImage
    });
    const token = response.headers.authorization;
    const tokenAndId = { token, id: response.data.id };
    saveUser(tokenAndId);
    return tokenAndId;
  } catch (err) {
    throwCorrectException(err);
  }
}

export async function loginUser(email, password) {
  try {
    const response = await axios.post("api/login", {
      email,
      password,
    });
    const token = response.headers.authorization;
    const tokenAndId = { token, id: response.data.id };
    saveUser(tokenAndId);
    return tokenAndId;
  } catch (err) {
    throwCorrectException(err);
  }
}

export async function getCurrentUser() {
  try {
    const currentUser = getUser();
    const res = await axios.get("/api/users/current", {
      headers: {
        authorization: currentUser.token || ""
      }
    });
    return res;
  } catch (err) {
    throwCorrectException(err);
  }
}

export async function getUserWith(id) {
  try {
    return await axios.get(`/api/users/${id}`);
  } catch (err) {
    throwCorrectException(err);
  }
}

export async function addOrRemoveFriend(id) {
  try {
    const currentUser = getUser();
    const res = await axios.put(`/api/users/${id}/friends`,
      {},
      {
        headers: {
          authorization: currentUser.token
        }
      }
    );
    return res;
  } catch (err) {
    throwCorrectException(err);
  }
}

export async function getUserFriends(id) {
  try {
    const { data } = await axios.get(`/api/users/${id}/friends`);
    return data;
  } catch (err) {
    throwCorrectException(err);
  }
}

export function getUserReviews(id) {
  try {
    return axios.get(`/api/users/${id}/reviews`);
  } catch (err) {
    throwCorrectException(err);
  }
}
