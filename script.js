function setMatrix() {
    let matrix = [["?", "?", "?", "?", "?"],
                  ["?", "?", "?", "?", "?"],
                  ["?", "?", "?", "?", "?"],
                  ["?", "?", "?", "?", "?"],
                  ["?", "?", "?", "?", "?"]];

    let numberSet = 0; //matrix has 0 elements before it is filled
    let current= 1; //first number/content to start filling your matrix with

    while (numberSet < 25) {
        let x = Math.floor(Math.random()*5);  //random index to start filling
        let y = Math.floor(Math.random()*5); //random second index

        if (matrix[x][y] == "?") {   //if chosen field has a queastion mark fill it with first content
            matrix[x][y] = current;  
            numberSet++;  //increment the number of set fields

            if (numberSet % 2 == 0) {  //to ensure that two fields have the same number, and then changes content to be stored
                current++;
            }
        }
    }

    for (let i=0; i<5; i++) {        //to put question marks when not opened
        for (let j=0; j<5; j++) {
            document.getElementById("m" + i + j).innerHTML="?";
        }
    }

    return matrix;
}

let matrix = setMatrix();
let guessedFields = [[false, false, false, false, false],
                     [false, false, false, false, false],
                     [false, false, false, false, false],
                     [false, false, false, false, false],
                     [false, false, false, false, false]];

let numOfOpenedFields = 0;
let currentOpenedField = null;

function press(m, n) {
    if (guessedFields[m][n]) {
        return;
    }

    if (numOfOpenedFields >= 2) {  //if two fields are opened after some time they will close
        return;
    }

    numOfOpenedFields++; //1 one field is currently opened

    document.getElementById("m"+ m + n).innerHTML = matrix[m][n]; //sets the inner htl of the elemnt of particular ID to the corresponding value in the matrix

    if(numOfOpenedFields == 1) {
        currentOpenedField = {      //if one field is open, it stores cordinates into current opened field variable
            i: m,
            j: n
        };
    } else if (numOfOpenedFields == 2) { //if two fields are opened
        if (matrix[currentOpenedField.i][currentOpenedField.j] == matrix[m][n])  { //if it is a match
            guessedFields[m][n] = true; //set it to guessed fields
            guessedFields[currentOpenedField.i][currentOpenedField.j] = true;
            numOfOpenedFields = 0; //restart
            document.getElementById("m" + m + n).style.backgroundColor = "#c44b2d"; 
            document.getElementById("m"+currentOpenedField.i + currentOpenedField.j).style.backgroundColor = "#c44b2d"
        }
        else { //if it is not
            setTimeout(function () { //close both fields
                document.getElementById("m" + m + n).innerHTML = "?"; 
                document.getElementById("m" + currentOpenedField.i+currentOpenedField.j).innerHTML = "?";
                numOfOpenedFields = 0;
            }, 1000);
        }
    }
}