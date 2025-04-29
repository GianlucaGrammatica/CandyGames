const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');

const portNumber = 3000;
const ipAddress = '127.0.0.1';

function getAbsoluteUrl(uri) {
  return 'http://' + ipAddress + ':' + portNumber + '/' + uri;
}

// nuova app EXPRESS
const app = express();

app.locals.baseUrl = getAbsoluteUrl('');

// Configura la directory per i file statici (css, js)
app.use(express.static('public'))

// Middleware che automaticamente effettua il parsing dei parametri
// inviati via HTTP dal form e crea un oggetto JS che li contiene
app.use(express.urlencoded({ extended: true }));

// ejs è il Template Engine che consente di fondere HTML e JS server side
app.set('view engine', 'ejs');

// Configura connessione al DB MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',        // <-- cambia con il tuo utente
  password: '',        // <-- cambia con la tua password
  database: 'emily_games' // <-- nome del tuo database
});

// Crea la connessione al database
db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL!');
});

// Route: GET /pokemons
app.get(['/', '/home', 'index'], (req, res) => {
  // scrivi la query
  const sql = 'SELECT * FROM giochi ORDER BY id ASC';
  // esegui la query
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Errore durante la query.');
      return;
    }
    // mostra i risultati usando la pagina index.ejs
    res.render('index', { games: results })
  });
});

// Avvio Web Server nella porta 3000 e IP 127.0.0.1
app.listen(portNumber, ipAddress, () => {
    console.log('Server avviato su http://' + ipAddress + ':' + portNumber);
  });