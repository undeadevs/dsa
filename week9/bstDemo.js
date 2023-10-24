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
`+------PreOrder------+`
                );
                bst.preOrderPrint();
                console.log(
`+--------------------+`
                );
console.log(
`+------In Order------+`
                );
                bst.inOrderPrint();
                console.log(
`+--------------------+`
                );
console.log(
`+-----Post Order-----+`
                );
                bst.postOrderPrint();
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

                    const success =bst.remove(number);
                    if(success) console.log(
`+---------------------+
Removed ${number}!
+---------------------+`
                    );
                    else console.log(
`+---------------------+
Can't found ${number}!
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
                        let numberToAdd = Math.floor(Math.random()*100)-50;
                        let success = bst.add(numberToAdd);
                        while(!success){
                            numberToAdd = Math.floor(Math.random()*100)-50;
                            success = bst.add(numberToAdd);
                        }
                    console.log(
`+---------------------+
Added ${numberToAdd}!
+---------------------+`
                    ); 

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
