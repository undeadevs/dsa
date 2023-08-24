const arr = [1, 5, 3, 11, 7, -2, -1];

console.log(arr);

for (let i = 0; i < arr.length - 1; ++i) {
    let lowestValIndex = i;
    for (let j = i; j < arr.length; ++j) {
        if (arr[j] < arr[lowestValIndex]) {
            lowestValIndex = j;
        }
    }
    const temp = arr[i];
    arr[i] = arr[lowestValIndex];
    arr[lowestValIndex] = temp;
}

console.log(arr);
