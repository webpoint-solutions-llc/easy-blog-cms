const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

export default removeFromLocalStorage;
