const DIR = parseInt(process.argv[3]);

let arr = new Array(parseInt(process.argv[2]))
    .fill(undefined)
    .map(() => Math.floor(Math.random() * 100000) - 5000);

console.log("UNSORTED: ");
console.log(arr);
console.log("-------------------------");

for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length - i - 1; ++j) {
        if (DIR === 0 ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
        console.log();
        console.log(arr);
        console.log();
    }
}

console.log("-------------------------");
console.log("SORTED: ");
console.log(arr);
