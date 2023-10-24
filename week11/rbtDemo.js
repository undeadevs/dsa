import { RBT } from "./rbt.js";

const newRBT = new RBT();

const toAddArr = [10, 18, 7, 15, 16, 30, 25, 40];
for(let i = 0; i < toAddArr.length; ++i){
    newRBT.add(toAddArr[i]);
}
newRBT.preOrderPrint();
