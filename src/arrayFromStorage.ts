export default function getArrayFromStorage() {
  if (localStorage.length !== 0) {
    const local = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const id = localStorage.key(i);
      local.push(JSON.parse(localStorage.getItem(id)));
    }
    return local;
  }
  return [];
}