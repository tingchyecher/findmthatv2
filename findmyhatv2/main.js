//Get input from the user through the terminal
const prompt = require('prompt-sync')({ sigint: true });


//Clear the terminal screen
const clear = require('clear-screen');


//Create some global variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const height = 10;       //row
const width = 10;        //col
const field = [       // Outer loop
    []      // Inner loop
];       //An empty 2D array

let currCharRow = 0;
let currCharCol = 0;


// (1) generate a field with 10 rows x 10 columns, 
function generateField() {

    //Outer Array - Row
    for (let row = 0; row < height; row++) {        // Default is all field

        field[row] = [];

        //Inner Array - Col
        for (let col = 0; col < width; col++) {


            // (4) Generate random holes
            // Check certain probability to generate field or hole
            // Generate a random from 0 to 9
            // Check if the random number < 3 then will display a hole +- 30%
            // check if the random number >=2 then will display field  +- 70% probability

            let prob = (Math.floor(Math.random() * 10));
            if (prob < 1) {
                field[row][col] = hole;
            }
            else {
                field[row][col] = fieldCharacter;
            }
        }   // End - Inner For Loop
    } //End - Outer For Loop

    // (2) Display the pathCharacter * to (0,0)
    field[currCharRow][currCharCol] = pathCharacter;

    // (3) Display the hat in random position
    // randomise the row and col

    let row = (Math.floor(Math.random() * 10));
    let col = (Math.floor(Math.random() * 10));
    field[row][col] = hat;

} //End of generateField function




function print() {

    clear();
    const displayString = field.map(row => {    //map
        return row.join('');
    }).join('\n');      // \n: is next line
    console.log(displayString);     //convert to string
} //End of print function

//map method is to loop through:
//(1) all the columns and join the elements with space
//(2) all the rows and join the elements with next line ('/n')

function askQuestion() {

    //prompt user to move the character

    // console.log("\nPlease enter u, d, l or r \n");

    const getInput = prompt('Which way?').toLowerCase();

    // check if getInput is u, d, l or r

    switch (getInput) {
        case "u":
            currCharRow--;
            break;
        case "d":
            currCharRow++;
            break;
        case "l":
            currCharCol--;
            break;
        case "r":
            currCharCol++;
            break;
        default:
            console.log("Please enter u, d, l or r");
            askQuestion();
            break;
    }   // end of switch-case
}   // End of function askQuestion()


function startGame() {

    let isPlaying = true;

    while (isPlaying) {     //(isPlaying == true)

        print();

        askQuestion();

        //   Condition - Out of bounds
        if (currCharRow < 0 || currCharRow > 9 || currCharCol < 0 || currCharCol > 9) {
            console.log("Out Of bounds - Game End!");
            return false;
        }
        // Condition - Fell into a hole
        else if ((field[currCharRow][currCharCol]) == hole) {
            console.log("Sorry, you fell down a hole!");
            isPlaying = false;
        }
        // Condition - Found the hat
        else if ((field[currCharRow][currCharCol]) == hat) {
            console.log("Congrats!, you found your hat!");
            isPlaying = false;
        }
        else {
            ((field[currCharRow][currCharCol]) = pathCharacter);

        }
    }   // End of While(isPlaying)
}   // end of function startGame()


generateField();
startGame(); 