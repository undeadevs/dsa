import { Stack } from "../week2/Stack.js";
import { Queue } from "../week2/Queue.js";

export default function() {
    let st = new Stack();

    console.log("--pop stack saat kosong");
    try {
        console.log(`Output: ${st}`);
        st.pop();
    } catch (err) {
        console.log("Error: " + err.message);
    }

    console.log();

    console.log("--push beberapa angka pada stack");

    console.log("Action: push 5");
    st.push(5);

    console.log("Action: push 3");
    st.push(3);

    console.log("Action: push 7");
    st.push(7);

    console.log("Action: push 2");
    st.push(2);

    console.log("Action: push 11");
    st.push(11);

    console.log(`Output: ${st}`);
    console.log();

    console.log("--pop angka pada stack");

    console.log("Action: pop");
    console.log(`Hasil 'pop': ${st.pop()}`);

    console.log("Action: pop");
    console.log(`Hasil 'pop': ${st.pop()}`);

    console.log(`Output: ${st}`);

    console.log();

    console.log("--menukar dua buah angka (swap) pada stack");

    console.log("Action: swap 0 and 2");
    st.swap(0, 2);

    console.log(`Output: ${st}`);

    console.log();

    let qu = new Queue();

    console.log("--dequeue (pop) queue saat kosong");
    try {
        console.log(`Output: ${qu}`);
        qu.dequeue();
    } catch (err) {
        console.log("Error: " + err.message);
    }

    console.log();

    console.log("--enqueue (push) beberapa angka pada queue");

    console.log("Action: enqueue 5");
    qu.enqueue(5);

    console.log("Action: enqueue 3");
    qu.enqueue(3);

    console.log("Action: enqueue 7");
    qu.enqueue(7);

    console.log("Action: enqueue 2");
    qu.enqueue(2);

    console.log("Action: enqueue 11");
    qu.enqueue(11);

    console.log(`Output: ${qu}`);
    console.log();

    console.log("--dequeue (pop) angka pada queue");

    console.log("Action: dequeue");
    console.log(`Hasil 'dequeue': ${qu.dequeue()}`);

    console.log("Action: dequeue");
    console.log(`Hasil 'dequeue': ${qu.dequeue()}`);

    console.log(`Output: ${qu}`);

    console.log();

    console.log("--menukar dua buah angka (swap) pada queue");

    console.log("Action: swap 0 and 2");
    qu.swap(0, 2);

    console.log(`Output: ${qu}`);
}
