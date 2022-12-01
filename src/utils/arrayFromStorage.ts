import { TOrder } from "../interfaces";

export default function getArrayFromStorage(): TOrder[] {
  if (localStorage.length !== 0) {
    const local = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const id = localStorage.key(i);
      if (id) {
        local.push(JSON.parse(localStorage.getItem(id) || ''));
      }
    }
    return local;
  }
  return [];
}