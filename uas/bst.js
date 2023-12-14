class BSTNode {
    #key;
    #left;
    #right;

    constructor(key){
        this.#key = key;
        this.#left = null;
        this.#right = null;
    }

    getLeft(){
        return this.#left;
    }

    setLeft(node){
        this.#left = node;
    }

    getRight(){
        return this.#right;
    }

    setRight(node){
        this.#right = node;
    }

    getKey(){
        return this.#key;
    }
}

class BST{
    #root;

    constructor(){
        this.#root = null;
    }

    add(key){
        const newNode = new BSTNode(key);
        if(!this.#root){
            this.#root = newNode;
            return;
        }

        let current = this.#root;
        while(current){
            if(key > current.getKey()){
                if(!current.getRight()){
                    current.setRight(newNode);
                    return true;
                }
                current = current.getRight();
            } else if(key < current.getKey()){
                if(!current.getLeft()){
                    current.setLeft(newNode);
                    return true;
                }
                current = current.getLeft();
            } else {
                return false;
            }
        }
    }

    remove(key){
        if(!this.#root){
            return false;
        }

        let prev = null;
        let current = this.#root;
        let wasCurrentLeft = false;
        while(current){
            if(key > current.getKey()){
                prev = current;
                current = current.getRight();
                wasCurrentLeft = false;
            } else if(key < current.getKey()){
                prev = current;
                current = current.getLeft();
                wasCurrentLeft = true;
            } else {
                if(!prev){
                    this.#root = null;
                    return true;
                }
                if(!current.getLeft() && !current.getRight()){
                    if(wasCurrentLeft){
                        prev.setLeft(null);
                        return true;
                    }
                    prev.setRight(null);
                    return true;
                } else if(!current.getLeft() && current.getRight()){
                    if(wasCurrentLeft){
                        prev.setLeft(current.getRight());
                        return true;
                    }
                    prev.setRight(current.getRight());
                } else if(current.getLeft() && !current.getRight()){
                    if(wasCurrentLeft){
                        prev.setLeft(current.getLeft());
                        return true;
                    }
                    prev.setRight(current.getLeft());
                } else {
                    let newMid = current.getLeft();
                    while(newMid.getRight()){
                        const temp = newMid.getRight();
                        if(!temp.getRight()){
                            newMid.setRight(null);
                        }
                        newMid = temp;
                    }
                }
                if(newMid!==current.getLeft()){
                    newMid.setLeft(current.getLeft());
                }
                newMid.setRight(current.getRight());
                if(wasCurrentLeft){
                    prev.setLeft(newMid);
                    return true;
                }
                prev.setRight(newMid);
                return true;
            }
        }
    }

    preOrderPrint(current){
        if(current){
            if(!current.getLeft() && !current.getRight()){
                return;
            }
        }

        if(!current) current = this.#root;

        console.log(current.getKey());

        if(current.getLeft()){
            this.preOrderPrint(current.getLeft());
        }

        if(current.getRight()){
            this.preOrderPrint(current.getRight());
        }
    }

    inOrderPrint(current){
        if(current){
            if(!current.getLeft() && !current.getRight()){
                return;
            }
        }

        if(!current) current = this.#root;


        if(current.getLeft()){
            this.inOrderPrint(current.getLeft());
        }

        console.log(current.getKey());

        if(current.getRight()){
            this.inOrderPrint(current.getRight());
        }
    }

    postOrderPrint(current){
        if(current){
            if(!current.getLeft() && !current.getRight()){
                return;
            }
        }

        if(!current) current = this.#root;

        if(current.getLeft()){
            this.postOrderPrint(current.getLeft());
        }

        if(current.getRight()){
            this.postOrderPrint(current.getRight());
        }

        console.log(current.getKey());
    }

    // Algoritma Seach No. 2
    find(key){
        if(!this.#root){
            return false;
        }
        let current = this.#root;
        while(current){
            if(key > current.getKey()){
                current = current.getLeft();
            } else if(key < current.getKey()){
                current = current.getRight();
            } else {
                return true;
            }
        }
        
        return false;
    }
}

const input = [58, 91, 34, 124, 18, 42, 78, 65, 61, 82, 70, 80, 86, 111, 137, 35, 24];
const newBST = new BST();
for(let i=0; i<input.length; ++i){
    newBST.add(input[i]);
}
newBST.preOrderPrint();
console.log();
newBST.inOrderPrint();
console.log();
newBST.postOrderPrint();
console.log();

let searchValue = 70;
if(newBST.find(searchValue)){
    console.log(`${searchValue} ditemukan di dalam tree`);
}else{
    console.log(`${searchValue} tidak ditemukan di dalam tree`);
}
