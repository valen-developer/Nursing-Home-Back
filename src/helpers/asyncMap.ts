export const asyncMap = async <T, U>(
  arr: T[],
  fn: (item: T, index: number) => Promise<U>
): Promise<U[]> => {
  const results: U[] = [];
  for (let index = 0; index < arr.length; index++) {
    results.push(await fn(arr[index], index));
  }
  return results;
};
