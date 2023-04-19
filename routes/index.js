var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const api_key = process.env.API_KEY;

router.get("/movies", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      let movies = []
      console.log(typeof(data.results))
      console.log(data.results[0])

        for(let movie of data.results) {
          console.log(movie)
          const str = movie.overview
          movies.push({
            title: movie.title,
            overview: str.substring(0,250) + '...',
            poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          })
        }
      
    res.json({movies})
 
  });
})
module.exports = router;
