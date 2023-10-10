import { BST } from "../week8/bst.js";
import readline from "readline";

const rl = readline.createInterface(process.stdin, process.stdout);

let choice = -1;

let bst = new BST();

function main() {
    if (choice === 0) {
        rl.close();
        return;
    }
    rl.setPrompt(
`+-Binary Search Tree-+
| 1. Show            |
| 2. Add             |
| 3. Remove          |
| 4. Generate        |
| 5. Clear           |
| 0. Exit            |
+--------------------+
Menu: `
    );

    rl.prompt();
    rl.once("line", (input) => {
        choice = parseInt(input);

        switch (choice) {
            case 1:
                console.log(
`+-------Algo 1-------+`
                );
                bst.algo1Print();
                console.log(
`+--------------------+`
                );
console.log(
`+-------Algo 2-------+`
                );
                bst.algo2Print();
                console.log(
`+--------------------+`
                );
console.log(
`+-------Algo 3-------+`
                );
                bst.algo3Print();
                console.log(
`+--------------------+`
                );
                main();
                break;
            case 2:
                rl.setPrompt(
`+--------------------+
What number to add? `
                )
                rl.prompt();
                rl.once("line", (numberInput) => {
                    const number = parseInt(numberInput);

                    const success = bst.add(number);
                    if(success) console.log(
`+---------------------+
Added ${number}!
+---------------------+`
                    ); 
                    else console.log(
`+---------------------+
Can't add ${number}!
+---------------------+`
                    ); 
                    main();
                });
                break;
            case 3:
                rl.setPrompt(
`+--------------------+
What number to delete? `
                )
                rl.prompt();
                rl.once("line", (numberInput) => {
                    const number = parseInt(numberInput);

                    bst.remove(number);
                    console.log(
`+---------------------+
Removed ${number}!
+---------------------+`
                    );
                    main();
                });
                break;
            case 4:
                rl.setPrompt(
`+--------------------+
How many to generate? `
                )
                rl.prompt();
                rl.once("line", (numberInput) => {
                    const number = parseInt(numberInput);

                    for(let i=0; i<number; ++i){
                        let success = bst.add(Math.floor(Math.random()*100)-50);
                        while(!success){
                            success = bst.add(Math.floor(Math.random()*100)-50);
                        }
                    }
                    console.log(
`+---------------------+
Generated ${number} items!
+---------------------+`
                    );
                    main();
                });
                break;
            case 5:
                bst.clear();
                main();
                break;
            case 0:
                main();
                break;
            default:
                    console.log(
`+---------------------+
Invalid menu choice
+---------------------+`
                    );
                main();
                break;
        }
    });
}

main();
