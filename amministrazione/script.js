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
          <a href="/gestione">gestione costi</a>
          <a href="/utility">REC utility</a>
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