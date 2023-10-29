import { RBT } from "./rbt.js";

const newRBT = new RBT();

// const toAddArr = [10, 18, 7, 15, 16, 30, 40, 25, 32, 42];
const toAddArr = [10, 1, 9, 2, 8, 3, 7, 4, 6, 5];
// const toAddArr = new Array(10).fill(undefined).map(()=>Math.floor(Math.random()*50)-25);
console.log("NUMBERS TO ADD:");
console.log(toAddArr.join(" "));
for (let i = 0; i < toAddArr.length; ++i) {
    newRBT.add(toAddArr[i]);
    console.log("ADDED " + toAddArr[i]);
}
console.log("TREE:");
newRBT.preOrderPrint();
