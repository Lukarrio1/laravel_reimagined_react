export function except(obj = {}, exceptions = []) {
  const newObj = {};
  const objKeys = Object.keys(obj);
  objKeys?.forEach((key) => {
    if (exceptions?.includes(key)) return;
    newObj[key] = obj[key];
  });
  return newObj;
}
