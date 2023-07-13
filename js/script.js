const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
let timerInterval; // Variável para armazenar o intervalo do timer
let loopInterval; // Variável para armazenar o intervalo do loop

const startTimer = () => {
  timerInterval = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  const playerName = localStorage.getItem("player");
  spanPlayer.innerHTML = playerName;
  startTimer();
};

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const showGameOver = () => {
  const gameOverImage = document.createElement("img");
  gameOverImage.src = "imagens/Game-Over-Jogo.png";
  gameOverImage.style.position = "fixed";
  gameOverImage.style.top = "50%";
  gameOverImage.style.left = "50%";
  gameOverImage.style.transform = "translate(-50%, -50%)";
  gameOverImage.style.maxWidth = "100%";
  gameOverImage.style.maxHeight = "100%";
  document.body.appendChild(gameOverImage);

  setTimeout(showMushroom, 2000); // Chama a função para mostrar o cogumelo após 2 segundos
};

const showMushroom = () => {
  const mushroomImage = document.createElement("img");
  mushroomImage.src = "imagens/nova-chance.png";
  mushroomImage.style.position = "fixed";
  mushroomImage.style.top = "50%";
  mushroomImage.style.left = "-100px"; // Posição inicial à esquerda
  mushroomImage.style.transform = "translateY(-50%)";
  mushroomImage.style.width = "100px";
  document.body.appendChild(mushroomImage);

  mushroomImage.addEventListener("click", () => {
    // Reiniciar o jogo
    clearInterval(loopInterval); // Limpa o intervalo do loop
    clearInterval(timerInterval); // Limpa o intervalo do timer
    location.reload(); // Recarrega a página para reiniciar o jogo
  });

  const moveMushroom = () => {
    let mushroomPosition = -100; // Posição inicial à esquerda

    const moveInterval = setInterval(() => {
      mushroomPosition += 1; // Incremento do deslocamento
      mushroomImage.style.left = `${mushroomPosition}px`;

      if (mushroomPosition >= window.innerWidth) {
        clearInterval(moveInterval); // Interrompe a animação quando o cogumelo atingir a borda direita da tela
      }
    }, 10);
  };

  moveMushroom(); // Inicia a animação do cogumelo
};

const loop = setInterval(() => {
  console.log("loop");

  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  console.log(marioPosition);

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "imagens/game-over.png";
    mario.style.width = "70px";
    mario.style.marginLeft = "50px";

    clearInterval(loop);
    clearInterval(timerInterval);
    setTimeout(showGameOver, 2000);
  }
}, 10);

document.addEventListener("keydown", jump);
