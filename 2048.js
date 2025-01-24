// nic zmiany byleby dodać do gita

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM załadowany!");
});

document.addEventListener("touchmove", (e) => {
    e.preventDefault();
}, { passive: false }); 

// document.addEventListener("DOMContentLoaded", () => {
//     const savedHighScore = localStorage.getItem("hscore");
//     if (savedHighScore) {
//         highScore = parseInt(savedHighScore, 10);
//         document.getElementById("highscore").innerText = highScore;
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const savedHighScore = localStorage.getItem("hScore");
    if (savedHighScore) {
        highScore = parseInt(savedHighScore, 10);
        console.log("Zapis wyniku:", highScore);
        document.getElementById("highscore").innerText = highScore;
    } else {
        console.log("Nie ma - 0");
        highScore = 0;
        document.getElementById("highscore").innerText = highScore;
    }
});


let board;

let score = 0;

let rows = 4;
let columns = 4;

let highScore = localStorage.getItem('hscore'); // Retrieve high score from local storage, default to 0 if not found


// window.onload = function() {
//     setGame()
// }

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    updateScoreDisplay();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("div"); // creates a <div></div> inside #board
            tile.id = r.toString() + "-" + c.toString(); //gives every created div and id equal to its row-column; div(1) id = "0-0"
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    dwaStart()
    dwaStart()
}


function resetGame() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c] = 0;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = 0;
            updateTile(tile, num); 
        }
    }
    score = 0; // Reset score
    updateScoreDisplay(); // Update score display
    updateHighScore(); // Check if high score needs to be updated
    document.getElementById("score").innerText = score; // Update score
    document.getElementById("highscore").innerText = score; // Update score
    dwaStart(); // Add new random tiles
    dwaStart();
}

function updateScoreDisplay() {
    document.getElementById("score").innerText = score;
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('hscore', highScore); // Store high score in local storage
        document.getElementById("highscore").innerText = "High Score: " + highScore;
    }
}


function pustePole() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0 ) {
                return true;
            }
        
        }
    }
    return false;
}

function dwaStart() {
    if (!pustePole()) {
        console.log("Game Over");
        return;
    }
    let startGry = false;
    while (!startGry) {
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            tile.innerText = "2";
            tile.classList.add("x2")
            startGry = true;
        }
    }
}

// function gameOver() {
//     if (!dwaStart()) {
//         console.log("Game Over")
//     }
// }

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
 }

 document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        dwaStart()
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        dwaStart()
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        dwaStart()
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        dwaStart()
    }
    document.getElementById("score").innerText = score;
 })

 function filterZero(row) {
    return row.filter(num => num != 0);
 }

 function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i]
        }//check every 2
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row
 }

 function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row
        row.reverse()

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }
    }
 }

 function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
 }

 function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
 }
 function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        row = slide(row);
        row.reverse()

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
 }

 let touchStartX = 0;
 let touchStartY = 0;
 let touchEndX = 0;
 let touchEndY = 0;
 
 document.addEventListener("touchstart", (e) => {
     touchStartX = e.touches[0].clientX;
     touchStartY = e.touches[0].clientY;
 });
 
 document.addEventListener("touchend", (e) => {
     touchEndX = e.changedTouches[0].clientX;
     touchEndY = e.changedTouches[0].clientY;
     handleSwipeGesture();
 });
 
 function handleSwipeGesture() {
     const deltaX = touchEndX - touchStartX;
     const deltaY = touchEndY - touchStartY;
 
     if (Math.abs(deltaX) > Math.abs(deltaY)) {
         if (deltaX > 50) {
             // Przesunięcie w prawo
             slideRight();
             dwaStart();
         } else if (deltaX < -50) {
             // Przesunięcie w lewo
             slideLeft();
             dwaStart();
         }
     } else {
         if (deltaY > 50) {
             slideDown();
             dwaStart();
         } else if (deltaY < -50) {
             slideUp();
             dwaStart();
         }

         document.getElementById("score").innerText = score;
     }};

const triggerKey = (key) => {
    const event = new KeyboardEvent("keydown", { key });
    document.dispatchEvent(event);
}

document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY
});

document.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY
});


function restartGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("hscore", highScore);
        document.getElementById("highscore").innerText = highScore;
        console.log("Highscore updated:", highScore);
    }

    score = 0;
    document.getElementById("score").innerText = score;

    resetBoard();
}





////////////////////////////////////////// CIASTECZKA

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", () => {
    const savedHighScore = getCookie("highScore");
    if (savedHighScore) {
        highScore = parseInt(savedHighScore, 10);
        document.getElementById("highscore").innerText = highScore;
    } else {
        console.log("No Highscore found in cookies, initializing to 0.");
        highScore = 0;
        document.getElementById("highscore").innerText = highScore;
    }
});

if (score > highScore) {
    highScore = score;
    setCookie("highScore", highScore, 365); // Przechowywanie na 1 rok
    console.log("New Highscore saved to cookies:", highScore);
    document.getElementById("highscore").innerText = highScore;
}

///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides
///////////////////////////////////////////////////////////////////////////////////////////// Other way to make slides

//  document.addEventListener("keyup", (d) => {
//     if (d.code == "ArrowRight") {
//         slideRight();
//     }
//  })

//  document.addEventListener("keyup", (w) => {
//     if (w.code == "ArrowUp") {
//         slideUp();
//     }
//  })

//  document.addEventListener("keyup", (s) => {
//     if (s.code == "ArrowDown") {
//         slideDown();
//     }
//     document.getElementById("score").append(score)
//  })



//  function slideRight() {
//     for (let r = 0; r < rows; r++) {
//         let row = board[r];
//         row = slideR(row);
//         board[r] = row;

//         for (let c = 0; c < columns; c++) {
//             let tile = document.getElementById(r.toString() + "-" + c.toString());
//             let num = board[r][c];
//             updateTile(tile, num);
//         }
//     }
// }

// function slideR(row) {
//     row = filterZero(row);

//     for (let i = row.length - 1; i > 0; i--) {
//         if (row[i] == row[i - 1]) {
//             row[i] *= 2;
//             row[i - 1] = 0;
//             score += row[i];
//         }
//     }

//     row = filterZero(row);

//     while (row.length < columns) {
//         row.unshift(0);
//     }

//     return row;
// }

// function slideUp() {
//     for (let c = 0; c < columns; c++) {
//         let column = getColumn(c);
//         column = slideUpColumn(column);
//         setColumn(c, column);

//         for (let r = 0; r < rows; r++) {
//             let tile = document.getElementById(r.toString() + "-" + c.toString());
//             let num = board[r][c];
//             updateTile(tile, num);
//         }
//     }
// }

// function slideDown() {
//     for (let c = 0; c < columns; c++) {
//         let column = getColumn(c);
//         column = slideDownColumn(column);
//         setColumn(c, column);

//         for (let r = 0; r < rows; r++) {
//             let tile = document.getElementById(r.toString() + "-" + c.toString());
//             let num = board[r][c];
//             updateTile(tile, num);
//         }
//     }
// }

// function getColumn(colIndex) {
//     let column = [];
//     for (let r = 0; r < rows; r++) {
//         column.push(board[r][colIndex]);
//     }
//     return column;
// }

// function setColumn(colIndex, column) {
//     for (let r = 0; r < rows; r++) {
//         board[r][colIndex] = column[r];
//     }
// }

// function slideUpColumn(column) {
//     column = filterZero(column);

//     for (let i = 0; i < column.length - 1; i++) {
//         if (column[i] === column[i + 1]) {
//             column[i] *= 2;
//             column[i + 1] = 0;
//             score += column[i];
//         }
//     }

//     column = filterZero(column);

//     while (column.length < rows) {
//         column.push(0);
//     }

//     return column;
// }

// function slideDownColumn(column) {
//     column = filterZero(column);

//     for (let i = column.length - 1; i > 0; i--) {
//         if (column[i] === column[i - 1]) {
//             column[i] *= 2;
//             column[i - 1] = 0;
//             score += column[i];
//         }
//     }

//     column = filterZero(column);

//     while (column.length < rows) {
//         column.unshift(0);
//     }

//     return column;
// }