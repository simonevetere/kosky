const loginForm = document.getElementById('loginForm');

function accedi(){
  window.location = "/amministrazione/"
}

// Funzioni per il popup
function apriPopup() {
  document.getElementById('passwordPopup').style.display = 'block';
}


function controllaPin() {

  localStorage.setItem('email',document.getElementById('email').value);
  localStorage.setItem('password',document.getElementById('password').value);
  localStorage.setItem('pin',document.getElementById('pin').value);

  login();
}