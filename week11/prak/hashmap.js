const valuesToAdd = ["ari", "wawan", "joko", "leo", "uwa"];
const N = 5;
const hashTable = new Array(N);

function hash(str, n) {
    let valueNum = 0;
    for (let i = 0; i < str.length; ++i) {
        valueNum += str.charCodeAt(i);
    }
    return valueNum % n;
}

for (let i = 0; i < N; ++i) {
    let key = hash(valuesToAdd[i], N);
    while (hashTable[key]) {
        key += 1;
        key = key % N;
    }
    hashTable[key] = valuesToAdd[i];
}

function search(str, n) {
    let key = hash(str, n);
    let found = hashTable[key] === str;
    while (!found && key < hashTable.length) {
        key += 1;
        found = hashTable[key] === str;
    }
    if (!found) key = -1;
    return key;
}

console.log(hashTable);
