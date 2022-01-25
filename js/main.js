// Gameboard object using the Module Pattern

const gameBoard = (() => {
  // let gameBoardContents = ['X','O','X','O','X','O','X','O','X'];
  let gameBoardContents = [];
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

  const render = () => {
    gameBoardCells.forEach((cell, index) => {
      cell.textContent = gameBoardContents[index];
    });
  };

  const isCellAvailable = (cell) => {
    return cell.textContent ? false : true;
  }

  const placeMarker = (event) => {
    if(isCellAvailable(event.target)) {
      event.target.textContent = 'X';
      game.continueTurn();
    }
    else {
      alert('Cell is unavailable');
    }
  };

  //bind events
  const addClickEvents = () => {
    gameBoardCells.forEach((cell) => {
      cell.addEventListener("click", placeMarker);
    });
  };

  render();

  return {gameBoardContents, addClickEvents};
})();

// Player object using a Factory Function

const playerFactory = (name, marker) => {
  return {name, marker};
}

// Game object using the Module Pattern

const game = (() => {
  let turnWaitToggle = true;

  const isWin  = (gameBoardContents) => {
    if(gameBoardContents[0] === gameBoardContents[3] && gameBoardContents[3] === gameBoardContents[6]) {
      return true;
    }
    if(gameBoardContents[1] === gameBoardContents[4] && gameBoardContents[4] === gameBoardContents[7]) {
      return true;
    }
    if(gameBoardContents[2] === gameBoardContents[5] && gameBoardContents[5] === gameBoardContents[8]) {
      return true;
    }
    if(gameBoardContents[0] === gameBoardContents[1] && gameBoardContents[1] === gameBoardContents[2]) {
      return true;
    }
    if(gameBoardContents[3] === gameBoardContents[4] && gameBoardContents[4] === gameBoardContents[5]) {
      return true;
    }
    if(gameBoardContents[6] === gameBoardContents[7] && gameBoardContents[7] === gameBoardContents[8]) {
      return true;
    }
    if(gameBoardContents[0] === gameBoardContents[4] && gameBoardContents[4] === gameBoardContents[8]) {
      return true;
    }
    if(gameBoardContents[2] === gameBoardContents[4] && gameBoardContents[4] === gameBoardContents[6]) {
      return true;
    }

    return false;
  }

  const isTie = (gameBoardContents) => {
    gameBoardContents.forEach((cell) => {if(!cell.textContent) return false;});
    if(!isWin()) return true;
  }

  const switchPlayers = (activePlayer, player1, player2) => {
    if(activePlayer === player1) {
      activePlayer = player2;
    }
    else {
      activePlayer = player1;
    }
  }

  const continueTurn = () => {
    turnWaitToggle = false;
  }

  const play = () => {
    const player1 = playerFactory('Player 1', 'X');
    const player2 = playerFactory('Player 2', 'O');

    let activePlayer = player1;
    
    gameBoard.addClickEvents();

    while(true) {
      alert(`${activePlayer.name}, make your play.`);

      //wait until click event (gameBoard.placeMarker) sends continueTurn
      //confirmation
      while(turnWaitToggle) {};

      if(isWin()) {
        alert(`${activePlayer.name}, you've won! Game over.`);
        break;
      }

      if(isTie()) {
        alert('Tie. Game over.');
        break;
      }

      turnWaitToggle = true;
      switchPlayers(activePlayer, player1, player2);
    }
  }

  const startGameBtn = document.querySelector('button');
  startGameBtn.addEventListener('click', play);

  return{continueTurn};
})();
