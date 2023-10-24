class BSTNode {
    #key;
    #left;
    #right;

    constructor(key) {
        this.#key = key;
        this.#left = null;
        this.#right = null;
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

    getKey() {
        return this.#key;
    }
}

class BST {
    #root;

    constructor() {
        this.#root = null;
    }

    add(key) {
        if (!this.#root) {
            this.#root = new BSTNode(key);
            return true;
        }
        let current = this.#root;
        while (current) {
            if (key < current.getKey()) {
                if (!current.getLeft()) {
                    current.setLeft(new BSTNode(key));
                    return true;
                }
                current = current.getLeft();
            } else if (key > current.getKey()) {
                if (!current.getRight()) {
                    current.setRight(new BSTNode(key));
                    return true;
                }
                current = current.getRight();
            } else {
                return false;
            }
        }
    }

    remove(key) {
        let found = false;
        let current = this.#root;
        while (current) {
            if (key < current.getKey()) {
                if (current.getLeft()) {
                    if (current.getLeft().getKey() === key) {
                        found = true;
                        let left = current.getLeft().getLeft();
                        let right = current.getLeft().getRight();

                        if (!left && !right) {
                            current.setLeft(null);
                        } else if (left && !right) {
                            current.getLeft().setLeft(null);
                            current.setLeft(left);
                        } else if (!left && right) {
                            current.getLeft().setRight(null);
                            current.setLeft(right);
                        } else {
                            let newMiddle = right;
                            while (newMiddle.getLeft()) {
                                let temp = newMiddle;
                                newMiddle = newMiddle.getLeft();
                                if (!newMiddle.getLeft()) {
                                    temp.setLeft(null);
                                }
                            }

                            newMiddle.setLeft(left);
                            if (newMiddle !== right) {
                                newMiddle.setRight(right);
                            }
                            current.setLeft(newMiddle);
                        }
                        return found;
                    }
                }
                current = current.getLeft();
            } else if (key > current.getKey()) {
                if (current.getRight()) {
                    if (current.getRight().getKey() === key) {
                        found = true;
                        let left = current.getRight().getLeft();
                        let right = current.getRight().getRight();

                        if (!left && !right) {
                            current.setRight(null);
                        } else if (left && !right) {
                            current.getRight().setLeft(null);
                            current.setRight(left);
                        } else if (!left && right) {
                            current.getRight().setRight(null);
                            current.setRight(right);
                        } else {
                            let newMiddle = right;
                            while (newMiddle.getLeft()) {
                                let temp = newMiddle;
                                newMiddle = newMiddle.getLeft();
                                if (!newMiddle.getLeft()) {
                                    temp.setLeft(null);
                                }
                            }

                            newMiddle.setLeft(left);
                            if (newMiddle !== right) {
                                newMiddle.setRight(right);
                            }
                            current.setRight(newMiddle);
                        }
                        return found;
                    }
                }
                current = current.getRight();
            } else {
                found = true;
                let left = current.getLeft();
                let right = current.getRight();

                if (!left && !right) {
                    this.#root = null
                } else if (left && !right) {
                    this.#root = current.getLeft();
                    current.setLeft(null);
                } else if (!left && right) {
                    this.#root = current.getRight();
                    current.setRight(null);
                } else {
                    let newMiddle = right;
                    while (newMiddle.getLeft()) {
                        let temp = newMiddle;
                        newMiddle = newMiddle.getLeft();
                        if (!newMiddle.getLeft()) {
                            temp.setLeft(null);
                        }
                    }

                    newMiddle.setLeft(left);
                    if (newMiddle !== right) {
                        newMiddle.setRight(right);
                    }
                    this.#root = newMiddle;
                }
                return found;
            }
        }
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
        console.log(root.getKey())
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
    BST,
}
