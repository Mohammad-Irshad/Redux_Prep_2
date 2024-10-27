import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MoviesList from './components/MoviesList'
import MoviesForm from './components/MoviesForm'

function App() {

  const [movieToEdit, setMovieToEdit] = useState(null)


  const handleEdit = (movie) => {
    setMovieToEdit(movie)
  }

  return (
    <main>
      <section className='container'>
        <h1 className='my-5 text-center'>Movies Listing App</h1>
        <div className='row'>
          <div className='col-md-6'>
            <h3 className='text-center pb-3'>Moives List</h3>
            <MoviesList onEdit={handleEdit} />
          </div>
          <div className='col-md-6'>
          <h3 className='text-center pb-3'>{movieToEdit ? 'Edit the movie' : 'Add a New Movie'}</h3>
            <MoviesForm movieToEdit={movieToEdit} setMovieToEdit={setMovieToEdit} />
          </div>
        </div>        
      </section>
    </main>
  )
}

export default App
