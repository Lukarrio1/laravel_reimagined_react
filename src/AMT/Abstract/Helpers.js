export function except(obj = {}, exceptions = []) {
  const newObj = {};
  const objKeys = Object.keys(obj);
  objKeys?.forEach((key) => {
    if (exceptions?.includes(key)) return;
    newObj[key] = obj[key];
  });
  return newObj;
}

export function createQueryString(params = {}) {
  const queryString = Object.keys(params)
    .map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(params[key] ? params[key] : null)
    )
    .join("&");
  return queryString;
}
