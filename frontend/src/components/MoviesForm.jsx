import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie, updateMovie } from '../features/moviesSlice'
import { useEffect } from 'react'
import { useRef } from 'react'

const MoviesForm = ({movieToEdit, setMovieToEdit}) => {
    const [localStatus, setLocalStatus] = useState(null)
    const [movieUpdate, setMovieUpdate] = useState(null)
    const [formData, setFormData] = useState({
        movieTitle : '',
        director : '',
        genre : ''
    })

    const movieNameRef = useRef(null)

    const dispatch = useDispatch()
    const {movies} = useSelector((state) => state.movies)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(formData.movieTitle && formData.director && formData.genre){
            try{
                if(movieToEdit){
                    setMovieUpdate(true)
                    await dispatch(updateMovie({movieId : movieToEdit._id, updatedData : formData})).unwrap()
                }else{
                    setMovieUpdate(false)
                    await dispatch(addMovie(formData)).unwrap()
                }
                // const alreadyExist = movies.find((movie) => movie.movieTitle === formData.movieTitle)
                // if(alreadyExist){
                //     await dispatch(updateMovie({movieId : alreadyExist._id, updatedData : formData})).unwrap()
                // }else{
                //     await dispatch(addMovie(formData)).unwrap()
                // }
                setLocalStatus('success')
                setFormData({ movieTitle: '', director: '', genre: '' })
                setMovieToEdit(null)
            }catch(error){
                console.log(error)
                setLocalStatus('error')
            }
        }else{
            alert('Please fill in all fields')
        }
        
    }

    const handleChange = async (e) => {
        setFormData({
            ...formData, 
            [e.target.id] : e.target.value
        })
        setLocalStatus(null)
    }

    useEffect(() => {
        if(movieToEdit){
            setFormData({
                movieTitle : movieToEdit.movieTitle,
                director : movieToEdit.director,
                genre : movieToEdit.genre
            })
            movieNameRef.current.focus()
        }
    },[movieToEdit])

  return (
    <div>
      <div className='card'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <label className='form-label' htmlFor='movieTitle'>Movie Name :</label>
                    <input type='text' id='movieTitle' value={formData.movieTitle} className='form-control' onChange={handleChange} ref={movieNameRef} />

                    <label className='form-label' htmlFor='director'>Director :</label>
                    <input type='text' id='director' value={formData.director} className='form-control' onChange={handleChange} />

                    <label className='form-label' htmlFor='genre'>Genre :</label>
                    <input type='text' id='genre' value={formData.genre} className='form-control' onChange={handleChange} />

                    <div className="d-flex justify-content-between my-4">
                        <button type='submit' className='btn btn-success' >{movieToEdit ? 'Update Movie' : 'Add Movie'}</button>
                        {
                            localStatus === 'loading' && 
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        {
                            localStatus === 'success' && <p className='text-success'>Movie {movieUpdate ? 'updated' : 'added'} successfully.</p>
                        }                               
                        {
                            localStatus === 'error' && <p className='text-danger'>Failed to {movieUpdate ? 'update' : 'add'} Movie. Please try again.</p>
                        }         
                    </div>        
                </form>
            </div>
        </div>
    </div>
  )
}

export default MoviesForm
