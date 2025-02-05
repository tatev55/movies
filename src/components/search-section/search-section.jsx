import { useState, useEffect } from "react";
import Button from "../button/button";
import{api} from "../../api/api"
import "./search-section.css";

const SearchSection = ({ setMovies, handleSavedMoviesClick, showSavedMovies  }) => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [timeOutId, setTimeoutId] = useState(null);
    

    useEffect(() => {
        const fetchMovies = async () => {
            if (value.length >= 3) {
                setIsLoading(true); 
                try {
                    const response = await api.fetchMoviesBySearch(value);
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

            
        clearTimeout(timeOutId)
      
        const timer = setTimeout(() => {
            fetchMovies();
        }, 1000);

        setTimeoutId(timer)

    }, [value, setMovies]);

    


    const handleSearchChange = (e) =>{
        setValue(e.target.value);
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
                <Button 
                className="button-saved" 
                disabled={isLoading} 
                onClick={handleSavedMoviesClick}>
                    {showSavedMovies ? "All Movies" : "Saved Movies"}
                    <i className="fa-solid fa-chevron-right"></i>
                </Button>
            </div>

        </div>
    );
};

export default SearchSection;




