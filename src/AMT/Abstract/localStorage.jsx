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
export function checkLocalStorageUsage() {
  let used = 0;
  const maxSize = 5120; // 5MB in KB

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // Safely get the length of stored items
      const item = localStorage.getItem(key);
      if (item) {
        used += item.length;
      }
    }
  }

  used = (used / 1024).toFixed(2); // Convert bytes to KB
  const percentageUsed = ((used / maxSize) * 100).toFixed(2);
  console.log(
    `Used localStorage: ${percentageUsed}%  ${used}KB / ${maxSize}KB`
  );
}
