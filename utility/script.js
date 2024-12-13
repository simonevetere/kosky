
//let timeLeft = 1498;
let timeLeft = 5;
let isRed = false;
let timerInterval;

const timerElement = document.getElementById("timer");
const bodyElement = document.body;
const resetButton = document.getElementById("resetButton");
const ciackButton = document.getElementById("ciackButton");

function startTimer() {

  timerElement.innerHTML = `24:59`;

  bodyElement.classList.add("green");
  timerInterval = setInterval(function() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerElement.innerHTML = `${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.innerHTML = "1) sostituire batteria!<br>2) re-start video<br>3) ricordati di battere le mani!<br>";
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


  audio2.play();

  // Mostra l'immagine ahhh.gif
  const rickroll = document.getElementById("rick-roll");
  rickroll.style.display = "block";

  setInterval(function() {
    if (isRed) {
      bodyElement.classList.remove("red");
      bodyElement.classList.add("green");
    } else {
      bodyElement.classList.remove("green");
      bodyElement.classList.add("red");
    }
    isRed = !isRed;
  }, 200);
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

const scriptTextArea = document.getElementById("scriptTextArea");
const saveScriptButton = document.getElementById("saveScriptButton");

// Carica lo script salvato in precedenza, se presente
const savedScript = localStorage.getItem("koskyRecScript");
if (savedScript) {
  scriptTextArea.value = savedScript;
}

// Salva lo script nella memoria del browser ad ogni modifica
scriptTextArea.addEventListener("input", function() {
  const script = scriptTextArea.value;
  localStorage.setItem("koskyRecScript", script);
  console.log("Script salvato!");
});