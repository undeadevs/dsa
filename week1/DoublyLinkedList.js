class DLLNode {
    #value;
    #next;
    #prev;
    constructor(value = 0) {
        this.#value = value;
        this.#next = null;
        this.#prev = null;
    }
    setNext(next) {
        this.#next = next;
    }
    getNext() {
        return this.#next;
    }
    setPrev(prev) {
        this.#prev = prev;
    }
    getPrev() {
        return this.#prev;
    }
    getValue() {
        return this.#value;
    }
}

class DoublyLinkedList {
    #first;
    #last;
    #length;
    constructor() {
        this.#first = null;
        this.#last = null;
        this.#length = 0;
    }
    append(value = 0) {
        const newNode = new DLLNode(value);
        this.#length += 1;
        if (!this.#last) {
            this.#first = this.#last = newNode;
            return;
        }
        this.#last.setNext(newNode);
        newNode.setPrev(this.#last);
        this.#last = newNode;
    }
    prepend(value = 0){
        const newNode = new DLLNode(value);
        this.#length += 1;
        if (!this.#first) {
            this.#first = this.#last = newNode;
            return;
        }
        newNode.setNext(this.#first);
        this.#first.setPrev(newNode);
        this.#first = newNode;
    }
    insert(value = 0, index = 0) {
        if (index < 0 || index >= this.#length) {
            throw new Error("Index out of bounds");
        }

        const newNode = new DLLNode(value);
        this.#length += 1;
        if (index === 0) {
            newNode.setNext(this.#first);
            this.#first.setPrev(newNode);
            this.#first = newNode;
            return;
        }

        current = this.#first;
        for (let i = 0; i < index - 1; ++i) {
            current = current.getNext();
        }

        if (current) {
            current.getNext().setPrev(newNode);
            newNode.setNext(current.getNext());
            newNode.setPrev(current);
            current.setNext(newNode);
            if (this.#last.getNext()) {
                this.#last = this.#last.getNext();
            }
        }

        return;
    }
    remove(index = 0) {
        if (index < 0 || index >= this.#length) {
            throw new Error("Index out of bounds");
        }

        this.#length -= 1;
        if (index === 0) {
            if (this.#first) {
                const tempFirst = this.#first;
                this.#first.getNext()?.setPrev(null);
                this.#first = this.#first.getNext();
                tempFirst.setNext(null);
            }
            return;
        }
        current = this.#first;
        for (let i = 0; i < index - 1; ++i) {
            current = current.getNext();
        }

        const nextNode = current.getNext();
        current.setNext(nextNode.getNext());
        nextNode.getNext().setPrev(current);
        nextNode.setNext(null);
        nextNode.setPrev(null);
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
            node2.setPrev(nodeBefore1);
        }
        const nodeAfter1 = node1.getNext();
        nodeBefore2.setNext(node1);
        node1.setPrev(nodeBefore2);
        node1.setNext(node2.getNext());
        if (isAdjacent) {
            node2.setNext(node1);
            node1.setPrev(node2);
        } else {
            node2.setNext(nodeAfter1);
            nodeAfter1.setPrev(node2);
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
    DLLNode,
    DoublyLinkedList,
}
