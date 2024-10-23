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
  const condition = Object.keys(params).length > 0;
  const queryString = Object.keys(params)
    .map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(params[key] ? params[key] : null)
    )
    .join("&");
  return condition ? "?" + queryString : queryString;
}
