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
  user: 'root',
  password: '',
  database: 'emily_games'
});

// Crea la connessione al database
db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL!');
});

// Route: GET /index
app.get(['/', '/home', '/index'], (req, res) => {

  const randomGameQuery = 'SELECT * FROM giochi ORDER BY RAND() LIMIT 1';

  const top3Query = 'SELECT * FROM giochi ORDER BY rating DESC LIMIT 3';

  // Esegui entrambe le query
  db.query(randomGameQuery, (err, randomResults) => {
    if (err) {
      res.status(500).send('Errore durante la query del gioco casuale.');
      return;
    }

    const randomGame = randomResults[0];

    db.query(top3Query, (err, top3Results) => {
      if (err) {
        res.status(500).send('Errore durante la query della top 3.');
        return;
      }

      // Passa sia il gioco casuale che la top 3 all'index.ejs
      res.render('index', {
        game: randomGame,
        top3: top3Results
      });
    });
  });
});



// Avvio Web Server nella porta 3000 e IP 127.0.0.1
app.listen(portNumber, ipAddress, () => {
    console.log('Server avviato su http://' + ipAddress + ':' + portNumber);
  });