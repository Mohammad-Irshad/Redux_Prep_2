const express = require('express')
const cors = require('cors')

const {initializeDatabase} = require('./db/db')
const {TheMovies} = require('./models/theMovies.model')

const app = express()

app.use(cors())
app.use(express.json())

initializeDatabase()

// welcome to the server

app.get('/', (req, res) => {
    res.send("This is Mohammad Irshad's server")
})

// Get all movies from db

app.get('/movies', async (req, res) => {
    try{
        const allMovies = await TheMovies.find()
        res.json(allMovies)
    }catch(error){
        res.status(500).json({error : "Internal Server Error"})
    }
})

// Add movie to the db

app.post('/movie', async (req, res) => {
    const newMovie = req.body
    console.log(newMovie)
    try{
        const movieData = new TheMovies(newMovie)
        await movieData.save()
        res.status(201).json(movieData)
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message })
    }
})

// Delete a movie

app.delete('/movies/delete/:movieId', async (req, res) => {
    try{
        const deletedMovie = await TheMovies.findByIdAndDelete(req.params.movieId)
        if(deletedMovie){
            res.status(201).json({message : "Movie deleted successfully", movie : deletedMovie})
        }else{
            res.status(404).json({message : "Movie not found!"})
        }
    }catch(error){
        res.status(500).json({error : "Internal server error : ", error})
    }
})

// Update a movie

app.patch('/movies/update/:movieId', async (req, res) => {
    try{
        const updatedMovie = await TheMovies.findByIdAndUpdate(req.params.movieId, req.body, {new : true})
        if(!updatedMovie){
            res.status(404).json({message : "Movie not found!"})
        }
        res.status(201).json({message : "Movie updated successfully.", movie : updatedMovie})
    }catch(error){
        console.error(error)
        res.status(500).json({error : "Internal server error : ", error})
    } 
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`App is running of PORT : ${PORT}`)
})