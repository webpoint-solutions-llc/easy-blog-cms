const saveToLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export default saveToLocalStorage;
