export default function filterArrItems(arr, cb) {
  const [item] = arr.filter(cb);
  return item;
}
