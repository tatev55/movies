import Button from "../button/button";
import { Storage } from "../../utils/storage";
import { useState } from "react";
import "./search-movie.css";




const SearchMovie = ({movie, onClick}) => {
    

    const savedMovies = Storage.getItem("savedMovies") || [];
    const isSaved = savedMovies.some(savedMovie => savedMovie.imdbID === movie.imdbID);

    const [isMovieSaved, setIsMovieSaved] = useState(isSaved);           
    
    const handleSavedClick =( movie) =>{

       let updatedSaveMovies = [...savedMovies];
       if(isMovieSaved){

         updatedSaveMovies = updatedSaveMovies.filter(savedMovie => savedMovie.imdbID !== movie.imdbID);
         setIsMovieSaved(false);

       }else{
        
        updatedSaveMovies.push(movie);
        setIsMovieSaved(true);
       }
       Storage.setItem("savedMovies", updatedSaveMovies)
         
    }
    return (
        <div className="container" onClick={() => onClick(movie)}>
            <div className="move">
                <div className="box-image">
                    <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                </div>
                <div className="box-description">
                    <h3 className="movie-title">{movie.Title}</h3>
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Type:</strong> {movie.Type}</p> 
                    <i className= {`fa-solid fa-bookmark ${isMovieSaved ? "savedIcon" : ""}`}
                     ></i>
                    <Button 
                        className= "saved" 
                        onClick={(event) =>{
                            event.stopPropagation();
                            handleSavedClick(movie)
                        }}>
                            {isMovieSaved ? "Remove" : "Saved"}
                        </Button>
                </div>

            </div>
        </div>
    )
}

export default SearchMovie;