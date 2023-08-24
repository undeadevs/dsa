class STNode {
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

class Stack {
    #first;
    #length;

    constructor() {
        this.#first = null;
        this.#length = 0;
    }

    hasPop() {
        return this.#first !== null;
    }

    push(value = 0) {
        const newNode = new STNode(value);
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

    pop() {
        if (!this.hasPop()) throw new Error("Unable to pop, Stack is empty");

        this.#length -= 1;
        let before = null;
        let current = this.#first;
        while (current.getNext()) {
            before = current;
            current = current.getNext();
        }
        if (this.#first === current) this.#first = null;
        before?.setNext(null);
        return current.getValue();
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

    getLength() {
        return this.#length;
    }

    toString() {
        if(this.#length===0) return "<empty Stack>"
        let resultString = "";
        let current = null;
        for (let i = 0; i < this.#length; ++i) {
            if (i === 0) {
                current = this.#first;
                resultString += current.getValue();
                current = current.getNext();
                continue;
            }
            resultString += "->"
            resultString += current.getValue();
            current = current.getNext();
        }
        return resultString;
    }
}

export {
    STNode,
    Stack,
}
