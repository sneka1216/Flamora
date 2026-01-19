export const setWithExpiry = (key: string, value: any, ttlMs: number) => {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttlMs,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  // If expired, remove it and return null
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item;
};
