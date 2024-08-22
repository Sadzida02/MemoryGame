function setMatrix() {
    let matrix = [["-", "-", "-", "-", "-"],
                  ["-", "-", "-", "-", "-"],
                  ["-", "-", "-", "-", "-"],
                  ["-", "-", "-", "-", "-"],
                  ["-", "-", "-", "-", "-"]];

    let numberSet = 0;
    let current= 1;

    while (numberSet < 25) {
        let x = Math.floor(Math.random()*5);
        let y = Math.floor(Math.random()*5);

        if (matrix[x][y] == "-") {
            matrix[x][y] = current;
            numberSet++;

            if (numberSet % 2 == 0) {
                current++;
            }
        }
    }

    for (let i=0; i<5; i++) {
        for (let j=0; j<5; j++) {
            document.getElementById("m" + i + j).innerHTML="-";
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

function click(m, n) {
    if (guessedFields[m][n]) {
        return;
    }

    if (numOfOpenedFields >= 2) {
        return;
    }

    numOfOpenedFields++;

    document.getElementById("m"+ m + n).innerHTML = mat[m][n];

    if(numOfOpenedFields == 1) {
        currentOpenedField = {
            i: m,
            j: n
        };
    } else if (numOfOpenedFields == 2) {
        if (matrix[currentOpenedField.i][currentOpenedField.j] == matrix[m][n])  {
            guessedFields[m][n] = true;
            guessedFields[currentOpenedField.i][currentOpenedField.j] = true;
            numOfOpenedFields = 0;
            document.getElementById("m" + m + n).style.backgroundColor = "#c44b2d";
            document.getElementById("m"+currentOpenedField.i + currentOpenedField.j).style.backgroundColor = "#c44b2d"
        }
        else {
            setTimeout(function () {
                document.getElementById("m" + m + n).innerHTML = "-"; 
                document.getElementById("m" + currentOpenedField.i+currentOpenedField.j).innerHTML = "-";
                numOfOpenedFields = 0;
            }, 1000);
        }
    }
}