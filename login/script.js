const loginForm = document.getElementById('loginForm');

function login(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const pin = document.getElementById('pin').value;

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
      localStorage.setItem('email', email);
      localStorage.setItem('pin', pin);
      localStorage.setItem('password', password);
      window.location.href = '/amministrazione'; // Reindirizza alla pagina principale
    } else {
      alert('Credenziali non valide.');
    }
  })
  .catch(error => {
    console.error('Errore:', error);
  });
};

// Funzioni per il popup
function apriPopup() {
  document.getElementById('passwordPopup').style.display = 'block';
}


function controllaPin() {
  login()
}