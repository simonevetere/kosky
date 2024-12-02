let filtrato = true;

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

function insertCost(item, nome, costo) {
  var data = new Date().toISOString(); 

  var dataToSend = {
    item: item,
    nome: nome,
    costo: costo,
    data: data
  };

  fetch('https://kosky.it//insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    fetchDataAndDisplay();  
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle the error, e.g., show an error message to the user
  });
}

function accedi() {
  if (localStorage.getItem('login') == 'true') {
    fetchDataAndDisplay();
  } else {
    window.location = '/login'; 
  }
}

function fetchDataAndDisplay() {
  fetch('https://kosky.it//all', {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    const ret = createTable(data);
    const totale = ret.totale;
    const tabella = ret.tabella;

    displayContent(tabella, totale);
    setupAddCostPopup();
    addRowHandlers();
  })
  .catch(handleError);
}

function createTable(data) {
  const table = document.createElement('table');
  table.id = "tabella";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Nome (clicca x filtrare)</th>
        <th>Item</th>
        <th>Costo</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  let totale = 0;
  data.forEach(item => {
    const row = table.insertRow();
    row.insertCell().textContent = item.nome;
    row.insertCell().textContent = item.item;
    row.insertCell().textContent = item.costo;
    row.insertCell().textContent = item.data.substring(0,10);

    const costoNumerico = parseFloat(item.costo.replace(/[^0-9.]/g, ''));
    if (!isNaN(costoNumerico)) {
      totale += costoNumerico;
    }
  });

  return { tabella: table, totale: totale }; 
}

function addRowHandlers() {
  var table = document.getElementById("tabella");
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
      return function() {
        var cell = row.getElementsByTagName("td")[0];
        var id = cell.innerHTML;
        filter(id);
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

function displayContent(table,totale) {
  document.body.innerHTML = `

    <div id="back-dot" onclick="window.location.href='/'">
      <img src="/img/back.png" alt="Back" />
    </div>
    
    <dotlottie-player onclick="window.location = 'https://terribile.space'" src="https://lottie.host/9ee46b02-06d9-4f3d-b58d-894706d76640/Ug2gQBGp1U.json" background="transparent" speed="1" style="position: fixed;z-index: 9999;width: 64px; height: 64px; left: 0; top: 0;" loop autoplay></dotlottie-player>

    <div id="inside">
      ${table.outerHTML}

      <div class="total-row"> 
        <table>
          <tr>
            <td>Totale:</td>
            <td>${totale.toFixed(2)} €</td> 
          </tr>
        </table>
      </div>

      <button onclick="openPopup()">Aggiungi Costo</button> 
    </div>

    <footer>
      <br> © 2024 La Taverna del Kosky <br><br>Code by ©2024 <a href="https://terribile.space">terribile.SPACE</a> 
    </footer>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  `;

  // Aggiungi lo script dotlottie dinamicamente
  const script = document.createElement('script');
  script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
  script.type = "module";

  document.head.appendChild(script);
}

function setupAddCostPopup() {

  // Crea il popup
  const popup = document.createElement('div');
  popup.id = 'costPopup';
  popup.style.display = 'none'; // Inizialmente nascosto
  popup.innerHTML = `
    <h2>Aggiungi Costo</h2>
    <form id="costForm">
      <label for="item">Item:</label>
      <input type="text" id="item" name="item" required><br><br>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" name="nome" required><br><br>
      <label for="costo">Costo:</label>
      <input type="text" id="costo" name="costo" required><br><br>
      <button type="submit">Inserisci</button>
      <button type="button" onclick="closePopup()">Annulla</button>
    </form>
  `;
  document.body.appendChild(popup);

  // Gestisci l'invio del form
  const form = document.getElementById('costForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);
    const item = formData.get('item');
    const nome = formData.get('nome');
    const costo = formData.get('costo');

    // Call insertCost() to send data to the server
    insertCost(item, nome, costo); 

    closePopup(); 
    fetchDataAndDisplay(); 
  });
}

function openPopup() {
  document.getElementById('costPopup').style.display = 'block';
}

function closePopup() {
  document.getElementById('costPopup').style.display = 'none';
}

function handleError(error) {
  console.error('Error:', error);
  document.body.innerHTML = `
    <div id="error">Errore nel caricamento dei dati.</div>
  `;
}

function filter(id){
  filtrato = !filtrato;
  tot = 0;

  if(filtrato){
    window.location = window.location;

  } else {
    for(i = 1; i < document.getElementsByTagName("table")[0].rows.length;i++){
      if(!confrontaStringhe(id, document.getElementsByTagName("table")[0].rows[i].firstChild.textContent)){
        document.getElementsByTagName("table")[0].rows[i].style = "display: none";
      } else {
        tot += parseFloat(document.getElementsByTagName("table")[0].rows[i].children[2].textContent);
      }
    }
  }

  document.getElementsByTagName("table")[1].rows[0].children[1].textContent = tot + " €";
}

function confrontaStringhe(str1, str2) {
  // Converti entrambe le stringhe in minuscolo
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  if(str2.includes(str1) || str1.includes(str2)){
    return true;
  }

  return false;
}

login();

accedi();