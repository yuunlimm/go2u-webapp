import http from "./httpService";

const apiEndpoint = "http://localhost:27017/user/";

export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(id) {
  return http.find(u => u._id === id);
}

export function saveUser(user) {
  // let userInDb = http.find(u => u._id === user._id) || {};
  // userInDb.username = user.username;
  // userInDb.firstName = user.firstName;
  // userInDb.lastName = user.lastName;
  // userInDb.userType = user.userType;
  // userInDb.email = user.email;
  // userInDb.mobile = user.mobile;
  // userInDb.isGoer = user.isGoer;
  // if (!userInDb._id) {
  //   userInDb._id = Date.now();
  //   http.push(userInDb);
  // }
  // return userInDb;
}

export function deleteUser(id) {
  return http.delete(apiEndpoint + id);
}
