document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("nameInput");
  const betInput = document.getElementById("betInput");
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("game");
  const rollBtn = document.getElementById("rollBtn");
  const playerDice = document.getElementById("playerDice");
  const computerDice = document.getElementById("computerDice");
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  const backgroundMusic = document.getElementById("backgroundMusic");

  const playerNameDisplay = document.getElementById("playerName");
  const betInfoDisplay = document.getElementById("betInfo");
  const playerScoreDisplay = document.getElementById("playerScore");
  const computerScoreDisplay = document.getElementById("computerScore");

  let playerName = "";
  let bet = 0;
  let playerWins = 0;
  let computerWins = 0;

  startBtn.addEventListener("click", () => {
    error.textContent = "";

    playerName = nameInput.value.trim();
    bet = parseInt(betInput.value);

    if (!playerName && (!bet || bet <= 0)) {
      error.textContent = "Введіть ім’я та ставку!";
      return;
    } else if (!playerName) {
      error.textContent = "Введіть ім’я!";
      return;
    } else if (!bet || bet <= 0) {
      error.textContent = "Введіть коректну ставку (більше 0)!";
      return;
    }

    backgroundMusic.play();

    startScreen.classList.add("disabled-screen");
    nameInput.disabled = true;
    betInput.disabled = true;
    startBtn.disabled = true;

    gameScreen.classList.remove("inactive");
    rollBtn.disabled = false; 

    playerNameDisplay.textContent = `Гравець: ${playerName}`;
    betInfoDisplay.textContent = `Ставка: ${bet} гривень`;
  });

  rollBtn.addEventListener("click", () => {
    playerDice.classList.add("roll");
    computerDice.classList.add("roll");

    setTimeout(() => {
      playerDice.classList.remove("roll");
      computerDice.classList.remove("roll");

      const playerNum = Math.floor(Math.random() * 6) + 1;
      const computerNum = Math.floor(Math.random() * 6) + 1;

      playerDice.textContent = getDiceEmoji(playerNum);
      computerDice.textContent = getDiceEmoji(computerNum);

      if (playerNum > computerNum) {
        playerWins++;
        result.textContent = `${playerName} виграв цей раунд!`;
      } else if (playerNum < computerNum) {
        computerWins++;
        result.textContent = "Комп’ютер виграв цей раунд!";
      } else {
        result.textContent = "Нічия!";
      }

      updateScore();

      if (playerWins === 3 || computerWins === 3) {
        endGame();
      }
    }, 300);
  });

  function getDiceEmoji(num) {
    const dice = ["⚀","⚁","⚂","⚃","⚄","⚅"];
    return dice[num - 1];
  }

  function updateScore() {
    playerScoreDisplay.textContent = `Ваші перемоги: ${playerWins}`;
    computerScoreDisplay.textContent = `Перемоги комп’ютера: ${computerWins}`;
  }

  function endGame() {
    if (playerWins === 3) {
      result.textContent = `${playerName} переміг гру і виграв ${bet * 2} гривень! Може ще разок?`;
    } else {
      result.textContent = `Комп’ютер виграв гру, ${playerName} втратив ${bet} гривень! В наступний точно пощастить.`;
    }
    rollBtn.disabled = true;
    rollBtn.textContent = "Гру завершено";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Грати знову";
    restartBtn.style.marginTop = "15px";
    gameScreen.appendChild(restartBtn);
    
    restartBtn.addEventListener("click", () => resetGame(restartBtn));
  }

  function resetGame(restartBtn) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    playerWins = 0;
    computerWins = 0;
    updateScore();

    result.textContent = "";
    playerNameDisplay.textContent = "";
    betInfoDisplay.textContent = "";
    playerDice.textContent = "";
    computerDice.textContent = "";

    gameScreen.classList.add("inactive");
    rollBtn.textContent = "Кинути кубик";

    startScreen.classList.remove("disabled-screen");
    nameInput.disabled = false;
    betInput.disabled = false;
    startBtn.disabled = false;
    nameInput.value = "";
    betInput.value = "";
    error.textContent = "";

    restartBtn.remove();
  }
});
