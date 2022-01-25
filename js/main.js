// Gameboard object using the Module Pattern

const gameBoard = (() => {
  let gameBoard = ['X','O','X','O','X','O','X','O','X'];

  //cache DOM
  let c1r1 = document.querySelector('.c1.r1');
  let c2r1 = document.querySelector('.c2.r1');
  let c3r1 = document.querySelector('.c3.r1');
  let c1r2 = document.querySelector('.c1.r2');
  let c2r2 = document.querySelector('.c2.r2');
  let c3r2 = document.querySelector('.c3.r2');
  let c1r3 = document.querySelector('.c1.r3');
  let c2r3 = document.querySelector('.c2.r3');
  let c3r3 = document.querySelector('.c3.r3');

  const render = () => {
    c1r1.textContent = gameBoard[0];
    c2r1.textContent = gameBoard[1];
    c3r1.textContent = gameBoard[2];
    c1r2.textContent = gameBoard[3];
    c2r2.textContent = gameBoard[4];
    c3r2.textContent = gameBoard[5];
    c1r3.textContent = gameBoard[6];
    c2r3.textContent = gameBoard[7];
    c3r3.textContent = gameBoard[8];
  };

  render();

  return {c1r1, c2r1, c1r2};
})();

// Player object using a Factory Function

const playerFactory = (name, symbol) => {
  return { };
}

// Game object using the Module Pattern

const game = (() => {

})();
