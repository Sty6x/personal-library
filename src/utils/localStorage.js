import { uid } from "uid";

export function getLocalStorage() {
  const convertLocalStorage = Object.entries(localStorage);
  const library = convertLocalStorage.map((item) => {
    const parsedItem = { ...JSON.parse(item[1]) };
    return { ...parsedItem, lastUpdated: new Date(parsedItem.lastUpdated) };
  });
  return { localLibrary: library };
}

export async function addItem(item) {
  try {
    localStorage.setItem(item.id, JSON.stringify(item));
  } catch (err) {
    throw err;
  }
}

export async function removeItem(item) {
  try {
    localStorage.removeItem(item.id);
  } catch (err) {
    throw err;
  }
}

export async function updateItem(item) {
  try {
    localStorage.setItem(item.id, JSON.stringify(item));
  } catch (err) {
    throw err;
  }
}
