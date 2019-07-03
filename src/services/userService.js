import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(id) {
  return http.get(userUrl(id));
}

export function saveUser(user) {
  if (user._id) {
    const body = { ...user };
    delete user._id;
    http.put(userUrl(user._id), body);
  }

  return http.post(apiEndpoint, user);
}

export function deleteUser(id) {
  return http.delete(userUrl(id));
}
