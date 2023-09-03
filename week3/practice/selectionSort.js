async function selectionSort(arr, order, processCb) {
    for (let i = 0; i < arr.length - 1; ++i) {
        // When the order is ascending it is the lowestValIndex, otherwise it is the highestValIndex
        let lowestOrHighestValIndex = i;
        for (let j = i; j < arr.length; ++j) {
            if (order===0 ? arr[j] < arr[lowestOrHighestValIndex] : arr[j] > arr[lowestOrHighestValIndex]) {
                lowestOrHighestValIndex = j;
            }
        }
        const temp = arr[i];
        arr[i] = arr[lowestOrHighestValIndex];
        arr[lowestOrHighestValIndex] = temp;
        await processCb();
    }
}

export {
    selectionSort,
}
