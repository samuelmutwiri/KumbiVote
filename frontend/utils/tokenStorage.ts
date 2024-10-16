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

