async function insertionSort(arr, order, debugCb) {
    for (let i = 0; i < arr.length; ++i) {
        const toInsertVal = arr.splice(i, 1)[0];
        let j = i - 1;
        while (j >= 0) {
            if (order === 0 ? toInsertVal > arr[j] : toInsertVal < arr[j]) {
                break;
            }
            --j;
        }
        arr.splice(j + 1, 0, toInsertVal);
        await debugCb();
    }
}

export {
    insertionSort,
}
