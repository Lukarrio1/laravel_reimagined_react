export function setWithTTL(key, value, ttlInSeconds) {
  const nowInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
  const item = {
    value: value,
    expiry: nowInSeconds + ttlInSeconds ?? null, // Expiry time in seconds
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithTTL(key) {
  const itemStr = localStorage.getItem(key);

  // If the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const nowInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds

  // Compare the current time in seconds with the expiry time
  if (nowInSeconds > item.expiry && item.expiry != null) {
    // If the item has expired, remove it from storage and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
