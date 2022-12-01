import { TOrder } from "../interfaces";

export default function getArrayFromStorage(): TOrder[] {

  if (sessionStorage.length !== 0) {
    const local = [];
    
    
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const id = sessionStorage.key(i);
      console.log(sessionStorage.key(i));
      if (id) {
        local.push(JSON.parse(sessionStorage.getItem(id) || ''));
      }
    }
    return local;
  }
  return [];
}
