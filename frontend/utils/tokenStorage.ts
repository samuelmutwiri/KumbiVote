import Cookies from 'js-cookie';

export const setToken = (token: string, type = 'accessToken') => {
  Cookies.set(type, token, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 1 // 1 day
  });
};

export const getToken = (type = 'accessToken'): string | undefined => {
  return Cookies.get(type);
};

export const removeToken = (type = 'accessToken') => {
  Cookies.remove(type);
};


export const setToken = (token: string, type = 'accessToken') => {
  localStorage.setItem(type, token);
};

export const getToken = (type = 'accessToken'): string | null => {
  return localStorage.getItem(type);
};

export const removeToken = (type = 'accessToken') => {
  localStorage.removeItem(type);
};
