let arr = [1, 7, 5, 3, -2, -1, 0];

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid, arr.length));

    const mergedArr = [];
    let i = 0;
    let j = 0;
    while (i < left.length || j < right.length) {
        let leftValue = left[i];
        let rightValue = right[j];
        let mergeValue = null;
        if (leftValue === undefined) {
            mergeValue = rightValue;
            ++j;
        } else if (rightValue === undefined) {
            mergeValue = leftValue;
            ++i;
        } else if (leftValue <= rightValue) {
            mergeValue = leftValue;
            ++i;
        } else if (leftValue > rightValue) {
            mergeValue = rightValue;
            ++j;
        }
        mergedArr.push(mergeValue);
    }
    return mergedArr;
}

console.log(mergeSort(arr));
