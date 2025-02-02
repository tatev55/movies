import { useState, useEffect } from "react";
import Button from "../button/button";
import { Api } from "../../api/api";
import { Storage } from "../../utils/storage";
import SavedMoviesSection from "../savedMovie/saved-movie"; 
import { baseUrl } from "../../utils/constant";
import "./search-section.css";

const SearchSection = ({ setMovies }) => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSavedMovies, setShowSavedMovies] = useState(false);  
    const [savedMovies, setSavedMovies] = useState([]);  
    const api = new Api(baseUrl);

    useEffect(() => {
        const fetchMovies = async () => {
            if (value.length >= 3) {
                setIsLoading(true);
                try {
                    const response = await api.getMovies(value);
                    if (response && response.Search) {
                        setMovies(response.Search);  
                    } else {
                        setMovies([]);  
                    }
                } catch (error) {
                    console.error("Error", error);
                    setMovies([]);  
                } finally {
                    setIsLoading(false); 
                }
            }
        };

        const timer = setTimeout(() => {
            fetchMovies();
        }, 500); 

        return () => clearTimeout(timer); 

    }, [value, setMovies]);

    useEffect(() => {
       
        const savedMoviesList = Storage.getItem("savedMovies") || [];
        setSavedMovies(savedMoviesList);
    }, [showSavedMovies]);

    const handleSearchChange = (e) => {
        setValue(e.target.value);
    };

    const handleSavedMovies = () => {
        setShowSavedMovies(!showSavedMovies);
    };

    const updateSavedMoviesState = (updatedMovies) => {
        setSavedMovies(updatedMovies);  
        Storage.setItem("savedMovies", updatedMovies);  
    };

    return (
        <div className="search-section">
            <h1 className="about-movies-text">Unlimited movies, TV shows, and more</h1>
            <p className="question-text">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="search-item-box">
                <input 
                    type="text"
                    value={value}
                    onChange={handleSearchChange}
                    className="search-input"
                    placeholder="Search movie"
                />
                <Button className="button-saved" disabled={isLoading} onClick={handleSavedMovies}>
                    SavedMovies
                    <i className="fa-solid fa-chevron-right"></i>
                </Button>
            </div>

            <div className="movies-list">
            {showSavedMovies && (
                <div className="saved-movies-list">
                    {savedMovies.length > 0 ? (
                        savedMovies.map((movie) => (
                            <SavedMoviesSection 
                                key={movie.imdbID} 
                                movie={movie} 
                                updateSavedMoviesState={updateSavedMoviesState} 
                            />
                        ))
                    ) : (
                        <p>No saved movies found.</p>
                    )}
                </div>
            )}
            </div>
        </div>
    );
};

export default SearchSection;






