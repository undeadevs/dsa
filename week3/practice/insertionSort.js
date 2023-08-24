const arr = [1, 5, 3, 11, 7, -2, -1];

console.log(arr);

for (let i = 0; i < arr.length; ++i) {
    const toInsertVal = arr.splice(i, 1)[0];
    let j = i - 1;
    while (j >= 0) {
        if (toInsertVal > arr[j]) {
            break;
        }
        --j;
    }
    arr.splice(j + 1, 0, toInsertVal);
}

console.log(arr);
