import { useEffect, useState } from "react";
import{Api} from "../../api/api"
import Button from "../button/button";
import {Storage }from "../../utils/storage" 
import "./movies.css";


const MoviesSection = () => {
     const [movies, setMovies]  = useState([]); 
     const [isLoading, setLoading] = useState(true)
     const api = new Api('https://www.omdbapi.com/?s=guardians&apikey=a71429a8');    

     useEffect(() => {
         setLoading(true);
         const fetchMovies = async () => {
             const movieData = await api.getMovies('');
             if (movieData && movieData.Search) {
                 setMovies(movieData.Search); 
             }
         
             setLoading(false);
         }
         fetchMovies(); 

     }, [])

const handleSavedClick =(movie)=>{
    const savedMovies = Storage.getItem("savedMovies") || [];
    savedMovies.push(movie);
    Storage.setItem("savedMovies", savedMovies);
    
}
   
     return (
         <div className="movies-section">
             <h2 className="text-movies">Movies</h2>
             <div className="movies-container">
                 {isLoading ? (
                     <p>Loading movies...</p>  
                 ) : (
                     movies.length > 0 ? (
                         movies.map((movie) => (
                             <div className="movie-card" key={movie.imdbID}>
                                 <div className="box-image">
                                     <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                                 </div>
                                 <div className="box-description">
                                     <h3 className="movie-title">{movie.Title}</h3>
                                     <p><strong>Year:</strong> {movie.Year}</p>
                                     <p><strong>Type:</strong> {movie.Type}</p>
                                     <Button className= "saved" onClick={() => handleSavedClick(movie)}>Saved</Button>
                                 </div>
                                 
                             </div>
                         ))
                     ) : (
                         <p>No movies found.</p> 
                     )
                 )}
              </div>
         </div>
     );


    
}

export default MoviesSection;








  