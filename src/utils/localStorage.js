import { uid } from "uid";

export function getLocalStorage() {
  const convertLocalStorage = Object.entries(localStorage);
  const library = convertLocalStorage.map((item) => {
    const parsedItem = { ...JSON.parse(item[1]) };
    return { ...parsedItem, lastUpdated: new Date(parsedItem.lastUpdated) };
  });
  return { localLibrary: library };
}

export async function addItem(item, cb) {
  try {
    localStorage.setItem(item.id, JSON.stringify(item));
    cb = 0 || cb(item);
  } catch (err) {
    throw err;
  }
}
