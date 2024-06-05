export const useLocalStorage = (key: string) => {
  const setUserLocalStorage = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLocalStorage = () => {
    try {
      const user = window.localStorage.getItem(key);
      return user ? JSON.parse(user) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserLocalStorage = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setUserLocalStorage, getUserLocalStorage, removeUserLocalStorage };
};
