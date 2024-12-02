document.getElementById('load').addEventListener('loadeddata', function() {
  if(document.getElementById('sourcevideo').src == window.location + "vid/sigla_trim_low.mp4"){
    
    document.getElementById('sourcevideo').src = 'vid/sigla_trim.mp4';

    if (window.innerWidth <= 768) { // Verifica se sei su uno schermo piccolo
      document.getElementById('myVideo').width = 'auto'; // oppure un valore specifico
    }

    document.getElementById('myVideo').load(); // Ricarica il video
  }
});

// Controlla se l'email è presente nel localStorage
function login(){
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const pin = localStorage.getItem('pin');

  let loginData = {};

  if (pin) {
    loginData.pin = pin;
  } else {
    loginData.email = email;
    loginData.password = password;
  }

  fetch('https://kosky.it/wslogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      localStorage.setItem('login', 'true');
    } else {
      alert('Credenziali non valide.');
      localStorage.setItem('login', 'false');
    }

    accedi();
  })
  .catch(error => {
    console.error('Errore:', error);
    localStorage.setItem('login', 'false');
  });
};