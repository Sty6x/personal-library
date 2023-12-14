function removeGlobalState() {
  const convertLocalStorage = Object.entries(localStorage);
  const filteredItems = convertLocalStorage.filter((item, i) => {
    if (item[0] === "globalState") return;
    return item;
  });
  return filteredItems;
}

function parseLocalStorage(arr, keyValue) {
  const parseItems = arr.map((item) => {
    let parsedItem = { ...JSON.parse(item[keyValue]) };
    if (parsedItem.lastUpdated) {
      return { ...parsedItem, lastUpdated: parsedItem.lastUpdated };
    }
    return { ...parsedItem };
  });
  return parseItems;
}

export function getLocalStorage() {
  const library = parseLocalStorage(removeGlobalState(), 1);
  console.log(library);
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

export function getGlobalState() {
  const global = localStorage.getItem("globalState");
  const parseState = JSON.parse(global);
  return { ...parseState };
}

export function itemExist(itemId) {}
