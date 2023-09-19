export async function quickSort(arr, start, end, sortOrder, debugCb) {
    if (end - start <= 0) {
        return arr;
    }

    let pivot = end;

    let i = start - 1;
    for (let j = start; j <= end; ++j) {
        if (sortOrder === 0 ? arr[j] < arr[pivot] : arr[j] > arr[pivot]) {
            ++i;
            const temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }

        if (j === pivot) {
            ++i;
            const temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
            pivot = i;
        }

        await debugCb();
    }

    await quickSort(arr, start, pivot - 1, sortOrder, debugCb);
    await quickSort(arr, pivot + 1, end, sortOrder, debugCb);

    return arr;
}
