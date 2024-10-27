import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteMovie, fetchMovies } from '../features/moviesSlice'

const MoviesList = ({onEdit}) => {

    const dispatch = useDispatch()
    const {movies, status} = useSelector((state) => state.movies)

    useEffect(() => {
        dispatch(fetchMovies())
    },[])
    
    const deleteHandler = (movieId) => {
        dispatch(deleteMovie(movieId))
    }

  return (
    <div>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'success' && movies.length > 0 ? 
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id} className='list-group-item'>
                        <div className='row align-items-center'>
                            <div className='col-md-10'>
                                <h4>{movie.movieTitle}</h4>
                                <div className='row'>
                                    <div className='col-md-6'> <p>Director : {movie.director}</p> </div>
                                    <div className='col-md-6'> <p className=''>Genre : {movie.genre}</p> </div>   
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <button className='btn btn-sm btn-danger' onClick={() => deleteHandler(movie._id)}>Delete</button>
                                <br/>
                                <button className='btn btn-sm btn-info mt-2 px-3 text-white' onClick={() => onEdit(movie)}>Edit</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>     
            : 
            <p>Movies list is empty.</p>           
        }      
    </div>
  )
}

export default MoviesList

