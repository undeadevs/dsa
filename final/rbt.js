import { compareString } from "./utils.js";

class RBTNode {
    #key;
    #value;
    #examples;
    #left;
    #right;
    #parent;
    #red;

    constructor(key, value, examples) {
        this.#key = key;
        this.#value = value;
        this.#examples = examples;
        this.#left = null;
        this.#right = null;
        this.#parent = null;
        this.#red = true;
    }

    getLeft() {
        return this.#left;
    }

    setLeft(node) {
        this.#left = node;
    }

    getRight() {
        return this.#right;
    }

    setRight(node) {
        this.#right = node;
    }

    getParent() {
        return this.#parent;
    }

    setParent(node) {
        this.#parent = node;
    }

    getKey() {
        return this.#key;
    }

    getValue() {
        return this.#value;
    }

    getExamples() {
        return this.#examples;
    }

    setRed(red) {
        this.#red = red;
    }

    isRed() {
        return this.#red;
    }

    gimmick(){
        switch(this.#key){
            case "putar":
            case "roll":
                return "animate|rotate linear 1s 3";
            case "bakar":
            case "burn":
                return "fullscreen-gif|burn.gif";
            case "ledakan":
            case "explosion":
                return "fullscreen-gif|bigbang.gif";
            case "jatuh":
            case "fall":
                return "animate|fall ease-in 250ms forwards";
            case "lebar":
            case "wide":
                return "animate|stretch-h 500ms forwards";
            case "terbang":
            case "fly":
                return "animate|fly ease-in-out 1500ms forwards";
            case "hujan":
            case "rain":
                return "fullscreen-gif|rain.gif";
            case "air":
            case "water":
                return "fullscreen-gif|water.gif"
            case "memasak":
            case "cook":
                return "picture|cook.jpg";
            case "makan":
            case "eat":
                return "redirect|https://youtube.com/shorts/hdJiEa2Cv8Y?si=OfwnTNf8mfPXScxr";
            default:
                return "none"
        }
    }
}

class RBT {
    #root;

    constructor() {
        this.#root = null;
    }

    add(key, value, examples) {
        const newNode = new RBTNode(key, value, examples);
        if (!this.#root) {
            newNode.setRed(false);
            this.#root = newNode;
            return true;
        }
        let current = this.#root;
        while (current) {
            if (compareString(key, current.getKey()) < 0) {
                if (!current.getLeft()) {
                    current.setLeft(newNode);
                    newNode.setParent(current);
                    break;
                }
                current = current.getLeft();
            } else if (compareString(key, current.getKey()) > 0) {
                if (!current.getRight()) {
                    current.setRight(newNode);
                    newNode.setParent(current);
                    break;
                }
                current = current.getRight();
            } else {
                return false;
            }
        }
        current = newNode;

        if (!current.getParent().isRed()) return true;
        while (current !== this.#root && current.getParent().isRed()) {
            if (current.getParent() === current.getParent().getParent()?.getLeft()) {
                if (current.getParent().getParent().getRight()?.isRed()) {
                    current.getParent().setRed(false);
                    current.getParent().getParent().getRight().setRed(false);
                    current.getParent().getParent().setRed(true);
                    current = current.getParent().getParent();
                } else {
                    if (current === current.getParent().getRight()) {
                        let temp = current.getParent();
                        this.rotateToLeft(current.getParent());
                        current = temp;
                    }
                    current.getParent().setRed(false);
                    current.getParent().getParent().setRed(true);
                    this.rotateToRight(current.getParent().getParent())
                }
            } else {
                if (current.getParent().getParent().getLeft()?.isRed()) {
                    current.getParent().setRed(false);
                    current.getParent().getParent().getLeft().setRed(false);
                    current.getParent().getParent().setRed(true);
                    current = current.getParent().getParent();
                } else {
                    if (current === current.getParent().getLeft()) {
                        let temp = current.getParent();
                        this.rotateToRight(current.getParent());
                        current = temp;
                    }
                    current.getParent().setRed(false);
                    current.getParent().getParent().setRed(true);
                    this.rotateToLeft(current.getParent().getParent())
                }
            }
        }
        this.#root.setRed(false);
    }

    find(key) {
        let current = this.#root;
        while (current) {
            if (compareString(key, current.getKey()) < 0) {
                current = current.getLeft();
            } else if (compareString(key, current.getKey()) > 0) {
                current = current.getRight();
            } else {
                return current;
            }
        }

        return null;
    }

    rotateToRight(current) {
        if (!current.getLeft()) return;
        let temp = null;
        if (current.getLeft().getRight()) temp = current.getLeft().getRight();
        if (current === this.#root) {
            this.#root = current.getLeft();
        }
        if (current.getParent()) {
            if (current.getParent().getLeft() === current) current.getParent().setLeft(current.getLeft());
            else if (current.getParent().getRight() === current) current.getParent().setRight(current.getLeft());
        }
        current.getLeft().setParent(current.getParent());
        current.setParent(current.getLeft());
        current.getLeft().setRight(current);
        current.setLeft(temp);
        if (temp) temp.setParent(current);
    }

    rotateToLeft(current) {
        if (!current.getRight()) return;
        let temp = null;
        if (current.getRight().getLeft()) temp = current.getRight().getLeft();
        if (current === this.#root) {
            this.#root = current.getRight();
        }
        if (current.getParent()) {
            if (current.getParent().getLeft() === current) current.getParent().setLeft(current.getRight());
            else if (current.getParent().getRight() === current) current.getParent().setRight(current.getRight());
        }
        current.getRight().setParent(current.getParent());
        current.setParent(current.getRight());
        current.getRight().setLeft(current);
        current.setRight(temp);
        if (temp) temp.setParent(current);
    }

    clear() {
        this.#root = null;
    }

    preOrderPrint(root) {
        if (!root) {
            if (!this.#root) {
                console.log("<Empty>");
                return;
            }
            root = this.#root;
        }
        console.log(root.getKey(), root.isRed() ? "RED" : "BLACK")
        if (root.getLeft()) this.preOrderPrint(root.getLeft());
        if (root.getRight()) this.preOrderPrint(root.getRight());
    }

    inOrderPrint(root) {
        if (!root) {
            if (!this.#root) {
                console.log("<Empty>");
                return;
            }
            root = this.#root;
        }
        if (root.getLeft()) this.inOrderPrint(root.getLeft());
        console.log(root.getKey())
        if (root.getRight()) this.inOrderPrint(root.getRight());
    }

    postOrderPrint(root) {
        if (!root) {
            if (!this.#root) {
                console.log("<Empty>");
                return;
            }
            root = this.#root;
        }
        if (root.getLeft()) this.inOrderPrint(root.getLeft());
        if (root.getRight()) this.inOrderPrint(root.getRight());
        console.log(root.getKey())
    }
}

export {
    RBT,
}
