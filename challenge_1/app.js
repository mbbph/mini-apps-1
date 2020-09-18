var databoard = [[0,0,0], [0,0,0], [0,0,0]];
var player = true; //true = X, false = O

document.getElementById('xwin').style.display = "none";
document.getElementById('owin').style.display= "none";
document.getElementById('gameover').style.display = "none";

function clickOne() {
  if (databoard[0][0] === 0) {
    document.getElementById("one").innerHTML = `${player ? "X" : "O"}`;
    databoard[0][0] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
  }
}

function clickTwo() {
  if (databoard[0][1] === 0) {
    document.getElementById("two").innerHTML = `${player ? "X" : "O"}`;
    databoard[0][1] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}

function clickThree() {
  if (databoard[0][2] === 0) {
    document.getElementById("three").innerHTML = `${player ? "X" : "O"}`;
    databoard[0][2] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}

function clickFour() {
  if (databoard[1][0] === 0) {
    document.getElementById("four").innerHTML = `${player ? "X" : "O"}`;
    databoard[1][0] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}

function clickFive() {
  if (databoard[1][1] === 0) {
    document.getElementById("five").innerHTML = `${player ? "X" : "O"}`;
    databoard[1][1] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}

function clickSix() {
  if (databoard[1][2] === 0) {
    document.getElementById("six").innerHTML = `${player ? "X" : "O"}`;
    databoard[1][2] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}

function clickSeven() {
  if (databoard[2][0] === 0) {
    document.getElementById("seven").innerHTML = `${player ? "X" : "O"}`;
    databoard[2][0] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}

function clickEight() {
  if (databoard[2][1] === 0) {
    document.getElementById("eight").innerHTML = `${player ? "X" : "O"}`;
    databoard[2][1] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}

function clickNine() {
  if (databoard[2][2] === 0) {
    document.getElementById("nine").innerHTML = `${player ? "X" : "O"}`;
    databoard[2][2] = player;
    player = !player;
    let status = checkBoard();
    finishGame(status);
    }
}



function enableClicks() {
  document.getElementById("one").addEventListener("click", clickOne);
  document.getElementById("two").addEventListener("click", clickTwo);
  document.getElementById("three").addEventListener("click", clickThree);
  document.getElementById("four").addEventListener("click", clickFour);
  document.getElementById("five").addEventListener("click", clickFive);
  document.getElementById("six").addEventListener("click", clickSix);
  document.getElementById("seven").addEventListener("click", clickSeven);
  document.getElementById("eight").addEventListener("click", clickEight);
  document.getElementById("nine").addEventListener("click", clickNine);
}

function reset() {
  player = true;
  //reset databoard
  for (let i = 0; i < databoard.length; i++) {
    for (let j = 0; j < databoard[i].length; j++) {
      databoard[i][j] = 0;
    }
  }

  //reset dom
  document.getElementById("one").innerHTML = '&emsp;';
  document.getElementById("two").innerHTML = '&emsp;';
  document.getElementById("three").innerHTML ='&emsp;';
  document.getElementById("four").innerHTML = '&emsp;';
  document.getElementById("five").innerHTML = '&emsp;';
  document.getElementById("six").innerHTML = '&emsp;';
  document.getElementById("seven").innerHTML = '&emsp;';
  document.getElementById("eight").innerHTML = '&emsp;';
  document.getElementById("nine").innerHTML = '&emsp;';
  enableClicks();
}

enableClicks();
document.getElementById("reset").addEventListener("click", reset);



function finishGame(x) {
  if (x === 1) {
    document.getElementById('xwin').style.display = "inline";
    disableClicks();
  } else if (x === 2) {
    document.getElementById('owin').style.display = "inline";
    disableClicks();
  } else if (x === 3) {
    document.getElementById('gameover').style.display = "inline";
    disableClicks();
  } else {
    return;
  }
}

function disableClicks() {
  document.getElementById("one").removeEventListener("click", clickOne);
  document.getElementById("two").removeEventListener("click", clickTwo);
  document.getElementById("three").removeEventListener("click", clickThree);
  document.getElementById("four").removeEventListener("click", clickFour);
  document.getElementById("five").removeEventListener("click", clickFive);
  document.getElementById("six").removeEventListener("click", clickSix);
  document.getElementById("seven").removeEventListener("click", clickSeven);
  document.getElementById("eight").removeEventListener("click", clickEight);
  document.getElementById("nine").removeEventListener("click", clickNine);
}

function checkBoard() {
  let xwin = false;
  let owin = false;
  let fullboard = true;

  //rows
  for (let i = 0; i < databoard.length; i++) {
    let row = databoard[i];
    if (row[0] === true && row[1] === true && row[2] === true) {
      xwin = true;
    }
    if (row[0] === false && row[1] === false && row[2] === false) {
      owin = true;
    }
  }

  //cols
  for (let i = 0; i < databoard[0].length; i++) {
    if (databoard[0][i] === true && databoard[1][i] === true && databoard[2][i] === true) {
      xwin = true;
    }
    if (databoard[0][i] === false && databoard[1][i] === false && databoard[2][i] === false) {
      owin = true;
    }
  }

  //diags
  if (databoard[0][0] === true && databoard[1][1] === true && databoard[2][2] === true) {
    xwin = true;
  }

  if (databoard[2][0] === true && databoard[1][1] === true && databoard[0][2] === true) {
    xwin = true;
  }

  if (databoard[0][0] === false && databoard[1][1] === false && databoard[2][2] === false) {
    owin = true;
  }

  if (databoard[2][0] === false && databoard[1][1] === false && databoard[0][2] === false) {
    owin = true;
  }

  //check for full board
  for (let i = 0; i < databoard.length; i++) {
    let row = databoard[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 0) {
        fullboard = false;
      }
    }
  }

  if (xwin) {
    return 1;
  } else if (owin) {
    return 2;
  } else if (fullboard) {
    return 3;
  } else {
    return 0;
  }
}
