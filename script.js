document.getElementById('load').addEventListener('loadeddata', function() {
  if(document.getElementById('sourcevideo').src == window.location + "vid/sigla_trim_low.mp4"){
    
    document.getElementById('sourcevideo').src = 'vid/sigla_trim.mp4';

    if (window.innerWidth <= 768) { // Verifica se sei su uno schermo piccolo
      document.getElementById('myVideo').width = 'auto'; // oppure un valore specifico
    }

    document.getElementById('myVideo').load(); // Ricarica il video
  }
});