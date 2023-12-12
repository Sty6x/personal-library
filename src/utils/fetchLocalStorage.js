function getLocalStorage() {
  const convertLocalStorage = Object.entries(localStorage);
  const library = convertLocalStorage.map((item) => {
    const parsedItem = { ...JSON.parse(item[1]) };
    return { ...parsedItem, lastUpdated: new Date(parsedItem.lastUpdated) };
  });
  return { localLibrary: library };
}

export default getLocalStorage;
