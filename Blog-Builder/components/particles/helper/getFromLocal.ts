const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export default getFromLocalStorage;
