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

  const isCellAvailable = (cell) => {
    return cell.textContent === '' ? true : false;
  }

  const haveSameMarker = (cellIndex1, cellIndex2, cellIndex3) => {
    return (((!isCellAvailable(gameBoardCells[cellIndex1])) && (!isCellAvailable(gameBoardCells[cellIndex2])) && (!isCellAvailable(gameBoardCells[cellIndex3]))) && (gameBoardCells[cellIndex1].textContent === gameBoardCells[cellIndex2].textContent && gameBoardCells[cellIndex2].textContent === gameBoardCells[cellIndex3].textContent))
  }

  return {gameBoardCells, isCellAvailable, haveSameMarker};
})();

// Player object using a Factory Function

const playerFactory = (name, marker) => {
  return {name, marker};
}

// Game object using the Module Pattern

const game = (() => {
  const player1 = playerFactory('Player 1', 'X');
  const player2 = playerFactory('Player 2', 'O');
  let activePlayer = player1;

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
    startGameBtn.style.display = 'none';
    textBox.textContent = `${activePlayer.name}, your turn.`
    addBoardClickEvents();
  }

  const initiatePlayerTurn = (event) => {
    if(gameBoard.isCellAvailable(event.target)) {
      event.target.textContent = activePlayer.marker;
      if(isWin()) {
        textBox.textContent = `${activePlayer.name} has won. Game over.`;
        removeBoardClickEvents();
      }
      else if(isTie(gameBoard.gameBoardCells)) {
        textBox.textContent = `Tie. Game over.`;
        removeBoardClickEvents();
      }
      else {
        switchPlayers();
        textBox.textContent = `${activePlayer.name}, your turn.`
      }
    }
    else {
      alert('Cell is unavailable');
    }
  };

  //bind events
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

  const startGameBtn = document.querySelector('button');
  startGameBtn.addEventListener('click', startGame);

  return{};
})();
