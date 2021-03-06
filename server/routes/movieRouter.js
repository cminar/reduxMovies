const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
//get all the movies
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM movies';
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT plant query', err);
        res.sendStatus(500);
      });
});
//edit movie router
router.put('/', (req, res) => {
    const updatedMovie = req.body;
  
    const queryText = `UPDATE movies
    SET "title" = $1,
    "description" = $2
    WHERE id=$3;`;
  
    const queryValues = [
      updatedMovie.title,
      updatedMovie.description,
      updatedMovie.id,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200);})
      .catch((err) => {
        console.log('Error completing SELECT plant query', err);
        res.sendStatus(500);
      });
});
//get a movie with genres
router.get('/info/:id', (req, res) => {
    const queryText = 'SELECT "movies".*, "genres".name FROM "movies" JOIN "movie-genre" ON "movies".id = "movie-genre".movies_id JOIN "genres" ON "genres".id = "movie-genre".genres_id WHERE "movies".id = $1;';
    pool.query(queryText, [req.params.id])
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
        console.log('Error completing SELECT plant query', err);
        res.sendStatus(500);
        });
});
//get all movies with a specific genre
router.get('/genres/:id', (req, res) => {
    const queryText = `SELECT "movies".* FROM "movies" JOIN "movie-genre" ON "movies".id = "movie-genre".movies_id JOIN "genres" ON "genres".id = "movie-genre".genres_id WHERE "genres".name = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
        console.log('Error completing SELECT plant query', err);
        res.sendStatus(500);
        });
});
module.exports = router;