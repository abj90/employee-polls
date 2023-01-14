export function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export const isEmptyObj = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

export const getArraySortedBytimestamp = (array: any[]): any[] => {
  return array.sort((a, b) => array[b].timestamp - array[a].timestamp);
};
