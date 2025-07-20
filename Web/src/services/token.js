/**
 * Retrieves the current user's information from local storage.
 * {token:string, id:string} | null
 * @function getUser
 * @returns {{ token: string, id: string } | null} An object containing the user's token and ID,
 * or `null` if no user data is found in local storage.
 */
export const getUser = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  if (!token || !id) return null;
  return { token, id };
};

/**
 * Saves the user token and ID into local storage.
 * @function saveUser
 * @param {string} tokenAndId - The string containing the user's token and ID to be stored.
 * @returns {void}
 * @throws {Error} Throws an error if accessing local storage fails.
 */
export const saveUser = (tokenAndId) => {
  const { token, id } = tokenAndId;
  localStorage.setItem("token", token);
  localStorage.setItem("id", id);
};

/**
 * Delete the user from local storage
 * @function logoutUser
 * @returns {void}
 * @throws {void}
*/
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
};