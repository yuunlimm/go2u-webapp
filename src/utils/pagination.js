import _ from "lodash";

export const paginate = (users, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(users)
    .slice(startIndex)
    .take(pageSize)
    .value(); // will return lodash object
};
