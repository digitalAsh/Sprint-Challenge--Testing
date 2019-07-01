const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', (req, res) => {
  Games.getAll()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/games', async (req, res) => {
    const newGame = req.body;
    if(newGame.name && newGame.genre && newGame.releaseYear) {
        try {
            const game = await Games.insert(req.body);
            res.status(200).json(game);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'error adding game'
            });
        }
        } else if (!newGame.name || !newGame.genre || !newGame.releaseYear) {
            res.status(422).json({
                err: 'input property missing'
            })
        } 
})

module.exports = server;