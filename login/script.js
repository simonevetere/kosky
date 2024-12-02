const loginForm = document.getElementById('loginForm');

function accedi(){
  window.location = "/amministrazione/"
}

// Funzioni per il popup
function apriPopup() {
  document.getElementById('passwordPopup').style.display = 'block';
}


function controllaPin() {
  login();
}