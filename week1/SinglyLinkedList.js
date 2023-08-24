class SLLNode {
    #value;
    #next;
    constructor(value = 0) {
        this.#value = value;
        this.#next = null;
    }
    setNext(next) {
        this.#next = next;
    }
    getNext() {
        return this.#next;
    }
    getValue() {
        return this.#value;
    }
}

class SinglyLinkedList {
    #first;
    #length;
    constructor() {
        this.#first = null;
        this.#length = 0;
    }
    append(value = 0) {
        const newNode = new SLLNode(value);
        this.#length += 1;
        if (!this.#first) {
            this.#first = newNode;
            return;
        }
        let current = this.#first;
        while (current.getNext()) {
            current = current.getNext();
        }
        current.setNext(newNode);
    }
    prepend(value = 0) {
        const newNode = new SLLNode(value);
        this.#length += 1;
        if (!this.#first) {
            this.#first = newNode;
            return;
        }
        newNode.setNext(this.#first);
        this.#first = newNode;
    }
    insert(value = 0, index = 0) {
        if (index < 0 || index >= this.#length) {
            throw new Error("Index out of bounds");
        }

        const newNode = new SLLNode(value);
        this.#length += 1;
        if (index === 0) {
            newNode.setNext(this.#first);
            this.#first = newNode;
            return;
        }

        current = this.#first;
        for (let i = 0; i < index - 1; ++i) {
            current = current.getNext();
        }

        newNode.setNext(current?.getNext() || null);
        current.setNext(newNode);
        return;
    }
    remove(index = 0) {
        if (index < 0 || index >= this.#length) {
            throw new Error("Index out of bounds");
        }

        this.#length -= 1;
        if (index === 0) {
            const tempFirst = this.#first;
            this.#first = this.#first.getNext();
            tempFirst.setNext(null);
            return;
        }
        current = this.#first;
        for (let i = 0; i < index - 1; ++i) {
            current = current.getNext();
        }

        const nextNode = current.getNext();
        current.setNext(nextNode.getNext());
        nextNode.setNext(null);
    }
    swap(index1 = 0, index2 = 0) {
        if (index1 < 0 || index1 >= this.#length || index2 < 0 || index2 >= this.#length) {
            throw new Error("Index out of bounds");
        }

        if (index1 > index2) {
            [index1, index2] = [index2, index1];
        }

        const isAdjacent = index2 - index1 === 1;
        const isFirst = index1 === 0;

        let nodeBefore1 = null;
        let nodeBefore2 = null;
        let node1 = this.#first;
        let node2 = this.#first;

        for (let i = 0; i < index2; ++i) {
            if (i < index1) {
                nodeBefore1 = node1;
                node1 = node1.getNext();
            }
            if (i < index2) {
                nodeBefore2 = node2;
                node2 = node2.getNext();
            }
        }

        if (isFirst) {
            this.#first = node2;
        } else {
            nodeBefore1.setNext(node2);
        }
        const nodeAfter1 = node1.getNext();
        nodeBefore2.setNext(node1);
        node1.setNext(node2.getNext());
        if (isAdjacent) {
            node2.setNext(node1);
        } else {
            node2.setNext(nodeAfter1);
        }
    }
    get(index = 0) {
        if (index < 0 || index >= this.#length) {
            throw new Error("Index out of bounds");
        }

        if (index === 0) {
            return this.#first.getValue();
        }

        current = this.#first;
        for (let i = 0; i < index; ++i) {
            current = current.getNext();
        }

        return current.getValue();
    }
    getLength(){
        return this.#length;
    }
}

export {
    SLLNode,
    SinglyLinkedList,
}
