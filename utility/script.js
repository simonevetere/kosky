
let timeLeft = 5; // 45 minuti in secondi
let isRed = false;
let timerInterval;

const timerElement = document.getElementById("timer");
const bodyElement = document.body;
const resetButton = document.getElementById("resetButton");
const ciackButton = document.getElementById("ciackButton");

function startTimer() {
  timerInterval = setInterval(function() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerElement.innerHTML = `${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.innerHTML = "sostituire batteria!";
      blink();
    }

    timeLeft--;
  }, 1000);
}

function resetTimer() {
  window.location = window.location;
}

function blink() {

  let audio2 = new Audio('../suoni/song.mp3');

  // Nascondi l'immagine dopo un breve periodo (ad esempio, 2 secondi)
  setTimeout(function() {

    audio2.play();

    // Mostra l'immagine ahhh.gif
    const rickroll = document.getElementById("rick-roll");
    rickroll.style.display = "block";
  }, 2000); 

  setInterval(function() {
    if (isRed) {
      bodyElement.classList.remove("red");
    } else {
      bodyElement.classList.add("red");
    }
    isRed = !isRed;
  }, 500);
}

function playCiackSound() {
  let audio = new Audio('../suoni/ciack.mp3');

  // Mostra l'immagine ahhh.gif
  const ahhhGif = document.getElementById("ahhhGif");
  ahhhGif.style.display = "block";

  audio.play();

  // Nascondi l'immagine dopo un breve periodo (ad esempio, 2 secondi)
  setTimeout(function() {
    ahhhGif.style.display = "none";
  }, 500); 

  // Per ora, mostriamo solo un messaggio nella console
  console.log("Suono 'ciack' riprodotto!"); 
}

resetButton.addEventListener("click", resetTimer);
ciackButton.addEventListener("click", playCiackSound);