// Gameboard object using the Module Pattern

const gameBoard = (() => {
  let gameBoardCells = [];

  //cache DOM
  gameBoardCells.push(document.querySelector('.c1.r1'));
  gameBoardCells.push(document.querySelector('.c2.r1'));
  gameBoardCells.push(document.querySelector('.c3.r1'));
  gameBoardCells.push(document.querySelector('.c1.r2'));
  gameBoardCells.push(document.querySelector('.c2.r2'));
  gameBoardCells.push(document.querySelector('.c3.r2'));
  gameBoardCells.push(document.querySelector('.c1.r3'));
  gameBoardCells.push(document.querySelector('.c2.r3'));
  gameBoardCells.push(document.querySelector('.c3.r3'));

  const addAllCellPointers = () => {
    gameBoardCells.forEach((cell) => {
      cell.style.cursor = 'pointer';
    })
  }

  const clearBoard = () => {
    gameBoardCells.forEach((cell) => {
      cell.textContent = '';
    });
  }

  const isCellAvailable = (cell) => {
    return cell.textContent === '' ? true : false;
  }

  const haveSameMarker = (cellIndex1, cellIndex2, cellIndex3) => {
    return (((!isCellAvailable(gameBoardCells[cellIndex1])) && (!isCellAvailable(gameBoardCells[cellIndex2])) && (!isCellAvailable(gameBoardCells[cellIndex3]))) && (gameBoardCells[cellIndex1].textContent === gameBoardCells[cellIndex2].textContent && gameBoardCells[cellIndex2].textContent === gameBoardCells[cellIndex3].textContent))
  }

  return {gameBoardCells, addAllCellPointers, clearBoard, isCellAvailable, haveSameMarker};
})();

// Player object using a Factory Function

const playerFactory = (name, marker) => {
  return {name, marker};
}

// Game object using the Module Pattern

const game = (() => {
  //build players
  const player1 = playerFactory('Player 1', 'X');
  const player2 = playerFactory('Player 2', 'O');
  let activePlayer = player1;

  //cache DOM
  const startGameBtn = document.querySelector('.start');
  const restartGameBtn = document.querySelector('.restart');
  const newGameBtn = document.querySelector('.new');
  const textBox = document.querySelector('.text-box');

  const isWin  = () => {
    if(gameBoard.haveSameMarker(0,3,6)) {return true;}
    if(gameBoard.haveSameMarker(1,4,7)) {return true;}
    if(gameBoard.haveSameMarker(2,5,8)) {return true;}
    if(gameBoard.haveSameMarker(0,1,2)) {return true;}
    if(gameBoard.haveSameMarker(3,4,5)) {return true;}
    if(gameBoard.haveSameMarker(6,7,8)) {return true;}
    if(gameBoard.haveSameMarker(0,4,8)) {return true;}
    if(gameBoard.haveSameMarker(2,4,6)) {return true;}

    return false;
  }

  const isTie = (gameBoardCells) => {
    let result;

    gameBoardCells.forEach((cell) => {
      if(gameBoard.isCellAvailable(cell)) {
        result = false;
      }
    });

    if(result === false) {return false;}
    if(!isWin()) {return true;}
  }

  const switchPlayers = () => {
    if(activePlayer === player1) {
      activePlayer = player2;
    }
    else {
      activePlayer = player1;
    }
  }

  const startGame = () => {
    startGameBtn.classList.add('hide');
    restartGameBtn.classList.remove('hide');
    textBox.textContent = `${activePlayer.name}, your turn.`
    addBoardClickEvents();
    gameBoard.addAllCellPointers();
  }

  const restartGame = () => {
    gameBoard.clearBoard();
    if(activePlayer !== player1) {
      activePlayer = player1;
    }
    textBox.textContent = `${activePlayer.name}, your turn.`
    addBoardClickEvents();
    gameBoard.addAllCellPointers();
  }

  const newGame = () => {
    newGameBtn.classList.add('hide');
    gameBoard.clearBoard();
    if(activePlayer !== player1) {
      activePlayer = player1;
    }
    textBox.textContent = `${activePlayer.name}, your turn.`
    addBoardClickEvents();
    gameBoard.addAllCellPointers();
    restartGameBtn.classList.remove('hide');
  }

  const initiatePlayerTurn = (event) => {
    event.target.textContent = activePlayer.marker;
    event.target.removeEventListener('click', initiatePlayerTurn);
    event.target.style.cursor = 'auto';
    if(isWin()) {
      textBox.textContent = `${activePlayer.name} wins. Game over.`;
      restartGameBtn.classList.add('hide');
      newGameBtn.classList.remove('hide');
      removeBoardClickEvents();
    }
    else if(isTie(gameBoard.gameBoardCells)) {
      textBox.textContent = `Tie. Game over.`;
      restartGameBtn.classList.add('hide');
      newGameBtn.classList.remove('hide');
      removeBoardClickEvents();
    }
    else {
      switchPlayers();
      textBox.textContent = `${activePlayer.name}, your turn.`
    }
  };

  const addBoardClickEvents = () => {
    gameBoard.gameBoardCells.forEach((cell) => {
      cell.addEventListener("click", initiatePlayerTurn);
    });
  };

  const removeBoardClickEvents = () => {
    gameBoard.gameBoardCells.forEach((cell) => {
      cell.removeEventListener("click", initiatePlayerTurn);
    });
  };

  //bind events
  startGameBtn.addEventListener('click', startGame);
  restartGameBtn.addEventListener('click', restartGame);
  newGameBtn.addEventListener('click', newGame);

  return{};
})();
