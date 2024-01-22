import CryptoJS from 'crypto-js';

export const privateKey = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_PRIVATE_KEY_HASH_LOGIN as string);
export const initializationVector = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_INITIALIZATION_VECTOR as string);

const COOKIES_KEY = {
  USERNAME: 'username',
  PASSWORD: 'password',
  TOKEN: 'token',
  REFRESHTOKEN: 'refresh_token',
  EXPIRES: 'expires',
  USERINFO: 'user_info',
  RTCDTMFSender: 'user_info',
  ROLES: 'roles',
};

export default COOKIES_KEY;

const EQUAL = '=';

const expirationDate = new Date();
expirationDate.setFullYear(expirationDate.getFullYear() + 1);
const expirationDateValue = '; path=/; expires=' + expirationDate.toUTCString();

const configMode = {
  iv: initializationVector,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
};

export const encryptByAES = (text: string): string => {
  const cipher = CryptoJS.AES.encrypt(text, privateKey, configMode);
  return cipher.toString();
};

export const decryptByAES = (cipherText: string): string => {
  const cipher = CryptoJS.AES.decrypt(cipherText, privateKey, configMode);
  return cipher.toString(CryptoJS.enc.Utf8);
};

export const getCookieByKey = (name: string): string => {
  const cookie: { [key: string]: string } = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });

  return cookie[name];
};

export const deleteCookieByKey = (name: string): void => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;';
};

export const clearAllCookies = (): void => {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf(EQUAL);
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLoginCookies = (value: any): void => {
  const { userInfo } = value;
  document.cookie = COOKIES_KEY.USERINFO + EQUAL + JSON.stringify(userInfo) + expirationDateValue;
};

export const setCookieByKeyObject = (obj: { [key: string]: string }): void => {
  Object.keys(obj).forEach(key => {
    document.cookie = key + EQUAL + obj[key as keyof typeof obj] + expirationDateValue;
  });
};

// export const getUserInfoCookies(): IUserInfo | null {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserInfoCookies = (): any => {
  const userInfoCookies = getCookieByKey(COOKIES_KEY.USERINFO);
  if (!userInfoCookies) return null;
  const userInfo = JSON.parse(userInfoCookies);
  return userInfo;
};
