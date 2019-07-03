import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/order";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getOrders() {
  return http.get(apiEndpoint);
}

export function getOrder(id) {
  return http.get(userUrl(id));
}

export function saveOrder(user) {
  if (user._id) {
    const body = { ...user };
    delete user._id;
    http.put(userUrl(user._id), body);
  }

  return http.post(apiEndpoint, user);
}

export function deleteOrder(id) {
  return http.delete(userUrl(id));
}
