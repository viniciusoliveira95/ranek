export const serialize = (queryObj) => {
  let queryString = ""

  for (let key in queryObj) {
    queryString += `&${key}=${queryObj[key]}`
  }

  return queryString
}