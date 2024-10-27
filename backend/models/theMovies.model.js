const mongoose = require('mongoose')

const theMoviesSchema = mongoose.Schema({
    movieTitle : String,
    director : String,
    genre : String
}, {timeStamps : true})

const TheMovies = mongoose.model("TheMovies", theMoviesSchema)

module.exports = {TheMovies}