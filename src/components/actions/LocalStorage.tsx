export const useLocalStorage = (key: string) => {
  const setUserLocalStorage = (value: unknown) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLocalStorage = () => {
    try {
      const user = window.sessionStorage.getItem(key);
      return user ? JSON.parse(user) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserLocalStorage = () => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setUserLocalStorage, getUserLocalStorage, removeUserLocalStorage };
};
