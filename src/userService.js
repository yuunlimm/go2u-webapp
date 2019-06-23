// import * as genresAPI from "./fakeGenreService";

const users = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    lastName: "lim",
    firstName: "Yuun",
    email: "abcde@google.com",
    mobile: "0102301"
  }
];

export function getUsers() {
  return users;
}

export function getUser(id) {
  return users.find(u => u._id === id);
}

export function saveUser(user) {
  let userInDb = users.find(u => u._id === user._id) || {};
  userInDb.name = user.name;

  if (!userInDb._id) {
    userInDb._id = Date.now();
    users.push(userInDb);
  }

  return userInDb;
}

export function deleteUser(id) {
  let userInDb = users.find(u => u._id === id);
  users.splice(users.indexOf(userInDb), 1);
  return userInDb;
}
