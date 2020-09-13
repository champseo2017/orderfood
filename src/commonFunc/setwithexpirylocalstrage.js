import { reactLocalStorage } from "reactjs-localstorage";
import { CheckIsEmpty } from "../component/library/FuncCheckEmpty";
export const setWithExpiry = (key, value, ttl) => {
  if (CheckIsEmpty(key) && CheckIsEmpty(value) && CheckIsEmpty(ttl)) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    reactLocalStorage.set(key, JSON.stringify(item));
  }
};

export const getWithExpiry = (key) => {
  const itemStr = reactLocalStorage.get(key);
  if (CheckIsEmpty(itemStr) === false) {
    return "";
  }

  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    reactLocalStorage.remove(key);
    return "";
  }
  return item.value;
};
