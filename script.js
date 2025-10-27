document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("nameInput");
  const betInput = document.getElementById("betInput");
  const startScreen = document.getElementById("startScreen");
  const game = document.getElementById("game");
  const rollBtn = document.getElementById("rollBtn");
  const playerDice = document.getElementById("playerDice");
  const compDice = document.getElementById("computerDice");
  const res = document.getElementById("result");
  const err = document.getElementById("error");

  const music = document.getElementById("backgroundMusic");

  const playerNameText = document.getElementById("playerName");
  const betText = document.getElementById("betInfo");
  const playerScore = document.getElementById("playerScore");
  const compScore = document.getElementById("computerScore");

  let name = "";
  let bet = 0;
  let pWins = 0;
  let cWins = 0;

  startBtn.addEventListener("click", () => {
    err.textContent = "";
    name = nameInput.value.trim();
    bet = parseInt(betInput.value);

    if (!name && (!bet || bet <= 0)) {
      err.textContent = "Введи ім’я і ставку!";
      return;
    }
    if (!name) {
      err.textContent = "Введи ім’я!";
      return;
    }
    if (!bet || bet <= 0) {
      err.textContent = "Ставка має бути більше 0!";
      return;
    }

    music.play();
    music.volume = 0.05;

    startScreen.classList.add("disabled-screen");
    game.classList.remove("inactive");
    rollBtn.disabled = false;

    playerNameText.textContent = `Гравець: ${name}`;
    betText.textContent = `Ставка: ${bet} грн`;
  });

  rollBtn.addEventListener("click", () => {
    playerDice.classList.add("roll");
    compDice.classList.add("roll");

    setTimeout(() => {
      playerDice.classList.remove("roll");
      compDice.classList.remove("roll");

      const pNum = Math.floor(Math.random() * 6) + 1;
      const cNum = Math.floor(Math.random() * 6) + 1;

      playerDice.textContent = getDice(pNum);
      compDice.textContent = getDice(cNum);

      if (pNum > cNum) {
        pWins++;
        res.textContent = `${name} виграв раунд!`;
      } else if (pNum < cNum) {
        cWins++;
        res.textContent = "Бот виграв раунд!";
      } else {
        res.textContent = "Нічия!";
      }

      updateScore();

      if (pWins === 3 || cWins === 3) endGame();
    }, 300);
  });

  function getDice(n) {
    return ["⚀","⚁","⚂","⚃","⚄","⚅"][n - 1];
  }

  function updateScore() {
    playerScore.textContent = `Ваші перемоги: ${pWins}`;
    compScore.textContent = `Перемоги Бота: ${cWins}`;
  }

  function endGame() {
    if (pWins === 3) {
      res.textContent = `${name} переміг гру і виграв ${bet * 2} грн!`;
    } else {
      res.textContent = `Бот виграв гру, ${name} втратив ${bet} грн!`;
    }

    rollBtn.disabled = true;
    rollBtn.textContent = "Гру завершено";

    const againBtn = document.createElement("button");
    againBtn.textContent = "Грати ще";
    againBtn.style.marginTop = "15px";
    game.appendChild(againBtn);

    againBtn.addEventListener("click", () => reset(againBtn));
  }

  function reset(btn) {
    music.pause();
    music.currentTime = 0;

    pWins = 0;
    cWins = 0;
    updateScore();

    res.textContent = "";
    playerNameText.textContent = "";
    betText.textContent = "";
    playerDice.textContent = "";
    compDice.textContent = "";

    rollBtn.textContent = "Кинути кубик";
    rollBtn.disabled = false;

    startScreen.classList.remove("disabled-screen");
    game.classList.add("inactive");

    nameInput.disabled = false;
    betInput.disabled = false;
    startBtn.disabled = false;
    nameInput.value = "";
    betInput.value = "";
    err.textContent = "";

    btn.remove();
  }
});
