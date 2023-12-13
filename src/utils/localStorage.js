function removeGlobalState() {
  const convertLocalStorage = Object.entries(localStorage);
  const filteredItems = convertLocalStorage.filter((item, i) => {
    if (item[0] === "globalState") return;
    return item;
  });
  return filteredItems;
}

export function getLocalStorage() {
  const convertLocalStorage = Object.entries(localStorage);
  const library = removeGlobalState().map((item) => {
    const parsedItem = { ...JSON.parse(item[1]) };
    return { ...parsedItem, lastUpdated: new Date(parsedItem.lastUpdated) };
  });
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
