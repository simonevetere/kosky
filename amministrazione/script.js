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
      return true;
    } else {
      alert('Credenziali non valide.');
      localStorage.setItem('login', 'false');
      return false;
    }
  })
  .catch(error => {
    console.error('Errore:', error);
    localStorage.setItem('login', 'false');
    return false;
  });
};

function accedi(){
  if (localStorage.getItem('login') == 'true') {
    // Email presente, crea i link
    document.body.innerHTML = `

        <div id="back-dot" onclick="window.location.href='/'">
          <img src="/img/back.png" alt="Back" />
        </div>
        
        <dotlottie-player onclick="window.location = 'https://terribile.space'" src="https://lottie.host/9ee46b02-06d9-4f3d-b58d-894706d76640/Ug2gQBGp1U.json" background="transparent" speed="1" style="position: fixed;z-index: 9999;width: 64px; height: 64px; left: 0; top: 0;" loop autoplay></dotlottie-player>

        <div id="inside">
          <a href="https://webmail.register.it">Mail</a>
          <a href="https://www.youtube.com/@latanadelkosky">canale YouTube</a>
        </div>

        <footer>
          <br> &copy; 2024 La Taverna del Kosky <br><br>Code by &copy;2024 <a href="https://terribile.space">terribile.SPACE</a> 
        </footer>
    `;

    // Aggiungi lo script dotlottie dinamicamente
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.head.appendChild(script); 
  } else {
    // Email non presente, reindirizza a /login
   window.location = '/login'; 
  }
}

login();
setTimeout(() => accedi(), 2000);