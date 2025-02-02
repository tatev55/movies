import Button from "../button/button";
import { Storage } from "../../utils/storage";
import "./saved-movie.css";

const SavedMoviesSection = ({ movie, updateSavedMoviesState }) => {
    const handleRemoveMovie = () => {
        const savedMovies = Storage.getItem("savedMovies") || [];
        const updatedMovies = savedMovies.filter(savedMovie => savedMovie.imdbID !== movie.imdbID);
        updateSavedMoviesState(updatedMovies);  
    };

    return (
        <div className="savedMovies-container">
            <div className="savedMovies-info">
                <img src={movie.Poster} alt={movie.Title} className="saved-movie-poster" />
                <h3 className="savedMovie-title">{movie.Title}</h3>
                <Button onClick={handleRemoveMovie} className="remove">
                    <i className="fas fa-times"></i>
                </Button>
            </div>
         </div>
    );
};

export default SavedMoviesSection;



