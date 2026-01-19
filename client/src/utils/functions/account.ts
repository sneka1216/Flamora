export const setWithExpiry = <T>(key: string, value: T, ttlMs: number) => {
  if (typeof window === "undefined") return;
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttlMs,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string) => {
  if (typeof window === "undefined") return null;
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  // If expired, remove it and return null
  if (now?.getTime() > item?.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item;
};
