let duplicates = new Set();

function isDuplicate(value: number) {
  return duplicates.has(value);
}

function addDuplicate(value: number) {
  duplicates.add(value);
}

function findDuplicates(values: number[]) {
  let sorted_arr = values.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}
