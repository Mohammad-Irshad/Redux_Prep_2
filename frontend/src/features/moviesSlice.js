import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const response = await axios.get("http://localhost:3000/movies")
    return response.data
})

export const updateMovie = createAsyncThunk("movies/updateMovie", async ({movieId, updatedData}) => {
    const response = await axios.patch(`http://localhost:3000/movies/update/${movieId}`, updatedData)
    return response.data
})

export const addMovie = createAsyncThunk("movies/addMovie", async (newMovie) => {
    const response = await axios.post(`http://localhost:3000/movie`, newMovie)
    return response.data
})

export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (movieId) => {
    const response = await axios.delete(`http://localhost:3000/movies/delete/${movieId}`)
    return response.data
})

const moviesSlice = createSlice({
    name : 'movies',
    initialState : {
        movies : [],
        status : 'idle',
        error : null
    },
    reducers : {
        // the reducers
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchMovies.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.status = 'success'
            state.movies = action.payload
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(addMovie.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addMovie.fulfilled, (state, action) => {
            state.status = 'success'
            state.movies.push(action.payload)
        })
        .addCase(addMovie.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(updateMovie.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateMovie.fulfilled, (state, action) => {
            state.status = 'success'
            const movieIndex = state.movies.findIndex((movie) => movie._id === action.payload.movie._id)
            state.movies[movieIndex] = action.payload.movie
        })
        .addCase(updateMovie.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(deleteMovie.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deleteMovie.fulfilled, (state, action) => {
            state.status = 'success'
            state.movies = state.movies.filter((movie) => movie._id != action.payload.movie._id)
        })
        .addCase(deleteMovie.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        
    }
})

export default moviesSlice.reducer