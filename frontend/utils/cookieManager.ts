import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, options = {}) => {
  Cookies.set(name, value, options);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};

export const setUserPreferences = (preferences: object) => {
  setCookie('userPreferences', JSON.stringify(preferences));
};

export const getUserPreferences = () => {
  const preferencesString = getCookie('userPreferences');
  return preferencesString ? JSON.parse(preferencesString) : {};
};
