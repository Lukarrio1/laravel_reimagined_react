export function setWithTTL(key, value, ttl = null) {
  const now = new Date();
  const item = {
    value: value,
    expiry: ttl ? now.getTime() + ttl : null, // ttl is in milliseconds
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
  const now = new Date();

  // Compare the current time with the expiry time
  if (now.getTime() > item.expiry && item.expiry != null) {
    // If the item has expired, remove it from storage and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
