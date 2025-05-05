const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');

const portNumber = 3000;
const ipAddress = '127.0.0.1';

function getAbsoluteUrl(uri) {
  return 'http://' + ipAddress + ':' + portNumber + '/' + uri;
}

const app = express();
app.locals.baseUrl = getAbsoluteUrl('');

// Static files
app.use(express.static('public'));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Template engine
app.set('view engine', 'ejs');

// Connessione MySQL
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


// Home
app.get(['/', '/home', '/index'], (req, res) => {
  const randomGameQuery = 'SELECT * FROM giochi ORDER BY RAND() LIMIT 1';
  const top3Query = 'SELECT * FROM giochi ORDER BY rating DESC LIMIT 3';

  db.query(randomGameQuery, (err, randomResults) => {

    if (err) {
      res.status(500).send('Errore nella query del gioco casuale.');
      return;
    }

    const randomGame = randomResults[0];

    db.query(top3Query, (err, top3Results) => {
      if (err) {
        res.status(500).send('Errore nella query della top 3.');
        return;
      }

      res.render('index', {
        game: randomGame,
        top3: top3Results
      });
    });
  });
});


// Route GET /game/:id
app.get('/game/:id', (req, res) => {
  const gameId = parseInt(req.params.id);
  const sql = 'SELECT * FROM giochi WHERE id = ?';

  db.query(sql, [gameId], (err, results) => {
    if (err || results.length === 0) {
      res.status(404).render('404');
      return;
    }

    const foundGame = results[0];

    res.render('game', { game: foundGame });
  });
});




// About GET
app.get('/about', (req, res) => {
  res.render('about', { error: null });
});

// Login GET
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});


// Avvia il server
app.listen(portNumber, ipAddress, () => {
  console.log(`Server avviato su http://${ipAddress}:${portNumber}`);
});
