import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import blessed from "neo-blessed";
import { bubbleSort } from '../week3/practice/bubbleSort.js';
import { selectionSort } from '../week3/practice/selectionSort.js';
import { insertionSort } from '../week3/practice/insertionSort.js';
import { quickSort } from '../week6/quickSort.js';

// Create a screen object.
const screen = blessed.screen({
    smartCSR: true
});

const containerBox = blessed.box({
    mouse: true,
    keys: true,
    vi: true,
    parent: screen,
    scrollable: true,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    border: {
        type: "line",
    },
    content: ''
})

const negativeBox = blessed.box({
    parent: containerBox,
    top: 0,
    width: "50%",
    align: "right",
    valign: "top",
    content: ''
});

const positiveBox = blessed.box({
    parent: containerBox,
    left: "50%",
    top: 0,
    width: "50%",
    align: "left",
    valign: "top",
    content: ''
});

const menuBox = blessed.box({
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    right: 4,
    top: "50%",
    width: "shrink",
    height: 12,
    border: {
        type: "line",
    },
    content: "",
});

const prompt = blessed.prompt({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    keys: true,
    vi: true,
    mouse: true,
    tags: true,
    border: 'line',
    hidden: true
});

const message = blessed.message({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    keys: true,
    vi: true,
    mouse: true,
    tags: true,
    border: 'line',
    hidden: true
});

let sortModes = {
    "Bubble": bubbleSort,
    "Selection": selectionSort,
    "Insertion": insertionSort,
    "Quick": quickSort,
};

let isSorting = false;
let sortOrder = 0;
let sortMode = 0;

function rerenderMenus() {
    const menus = [
        "[F1] Generate",
        "[F2] Shuffle",
        "[F3] Reverse",
        "[F4] Sort Mode: " + (Object.keys(sortModes)[sortMode]),
        "[F5] Sort Order: " + (sortOrder ? "DESC" : "ASC"),
        "[F6] Sort",
        "[Q]  Quit",
    ];
    menuBox.setContent(menus.join("\n"));
    screen.render();
}

function rerenderItems() {
    negativeBox.setContent(arr.map(number => number > 0 ? "" : "█".repeat(number.toString().length - (number) - 1) + number).join("\n"));
    positiveBox.setContent(arr.map(number => number < 0 ? "" : number + "█".repeat(number.toString().length - (-number) - 1)).join("\n"));

    negativeBox.height = arr.length;
    positiveBox.height = arr.length;

    screen.render();
}

let arr = new Array(100)
    .fill(undefined)
    .map(() => Math.floor(Math.random() * 50) - 25);

rerenderMenus();
rerenderItems();

screen.key('f1', () => {
    if (isSorting) return;
    prompt.input("How many numbers you want to generate?", "", (err, value) => {
        if (isNaN(parseInt(value))) return screen.render();
        arr = new Array(parseInt(value))
            .fill(undefined)
            .map(() => Math.floor(Math.random() * 50) - 25);

        rerenderItems();
    });
});

screen.key('f2', () => {
    if (isSorting) return;
    for (let i = 0; i < arr.length; ++i) {
        const j = Math.floor(Math.random() * arr.length);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    rerenderItems();
});

screen.key('f3', () => {
    if (isSorting) return;

    arr.reverse();

    rerenderItems();
});

screen.key('f4', () => {
    if (isSorting) return;
    sortMode = (sortMode + 1) % Object.keys(sortModes).length;
    rerenderMenus();
});

screen.key('f5', () => {
    if (isSorting) return;
    sortOrder = sortOrder ^ 1;
    rerenderMenus();
});

screen.key('f6', async () => {
    if (isSorting) return;
    let startTime = Date.now();
    isSorting = true;
    const extraArgs = [];
    const sortModeStr = Object.keys(sortModes)[sortMode];
    if (sortModeStr === "Quick") {
        extraArgs.push(0);
        extraArgs.push(arr.length - 1);
    }
    await sortModes[sortModeStr](arr, ...extraArgs, sortOrder, async () => {
        rerenderItems();
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1);
        });
    });
    isSorting = false;
    rerenderItems();

    message.display("Sorted in: " + (Date.now() - startTime) + "ms", 0, () => {
        screen.render();
    });
});

screen.key(['q', 'Q'], () => {
    screen.destroy();
    process.exit(0);
});

screen.render();
