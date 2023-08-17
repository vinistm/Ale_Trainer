const timerDisplay = document.getElementById('timerDisplay');
const roundDisplay = document.getElementById('roundDisplay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const pauseButton = document.getElementById('pauseButton');
const roundSelector = document.getElementById('roundSelector');

let countdown;
let isPaused = true;
let currentRound = 1;
let roundsRemaining = 0;
let exerciseTime = 20; // segundos
let restTime = 10;     // segundos

const btnVoltar = document.getElementById("voltar");
btnVoltar.addEventListener("click", () => {
  window.location.href = "index.html";
});

function startTimer() {
    isPaused = false;
    startButton.textContent = "Pausar";

    countdown = setInterval(function () {
        if (!isPaused) {
            if (exerciseTime > 0) {
                timerDisplay.textContent = formatTime(exerciseTime);
                exerciseTime--;
            } else if (restTime > 0) {
                timerDisplay.textContent = formatTime(restTime);
                restTime--;
            } else {
                restTime = 10; // Reseta o tempo de descanso
                roundsRemaining--;

                if (roundsRemaining <= 0) {
                    clearInterval(countdown);
                    timerDisplay.textContent = "00:00";
                    roundDisplay.textContent = "Concluído!";
                    startButton.textContent = "Iniciar";
                    resetButton.style.display = "none";
                } else {
                    exerciseTime = 20; // Reseta o tempo de exercício
                    currentRound++;
                    roundDisplay.textContent = `${currentRound}/${roundSelector.value}`;
                }
            }
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    roundDisplay.textContent = "1/" + roundSelector.value;
    exerciseTime = 20;
    restTime = 10;
    isPaused = true;
    startButton.style.display = "block";
    resetButton.style.display = "none";
    startButton.textContent = "Iniciar";
}

resetButton.addEventListener('click', resetTimer);

startButton.addEventListener('click', function () {
    if (isPaused) {
        if (startButton.textContent === "Iniciar") {
            roundsRemaining = parseInt(roundSelector.value, 10);
            currentRound = 1;
            if (isNaN(roundsRemaining) || roundsRemaining <= 0) {
                return;
            }
            roundDisplay.textContent = `${currentRound}/${roundSelector.value}`;
            startTimer();
            startButton.style.display = "none";
            resetButton.style.display = "block";
        }
    } else {
        isPaused = true;
        startButton.style.display = "block";
        resetButton.style.display = "none";
        startButton.textContent = "Continuar";
    }
});

pauseButton.addEventListener('click', function () {
    isPaused = true;
    startButton.style.display = "block";
    resetButton.style.display = "none";
    startButton.textContent = "Continuar";
});
