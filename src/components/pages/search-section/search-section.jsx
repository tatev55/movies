import { useState, useEffect } from "react";
import Button from "../../button/button";
import "./search-section.css";

const SearchSection = ({ 
    handleSavedMoviesClick,
    showSavedMovies,
    setSearchQuery 
}) => {
    const [value, setValue] = useState('');
    const [timeOutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (timeOutId) {
            clearTimeout(timeOutId); 
        }

        const timer = setTimeout(() => {
            setSearchQuery(value); 
        }, 1000); 

        setTimeoutId(timer); 

        return () => clearTimeout(timer); 
    }, [value, setSearchQuery]); 

    const handleSearchChange = (e) => {
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
                    onClick={handleSavedMoviesClick}>
                    {showSavedMovies ? "All Movies" : "Saved Movies"}
                    <i className="fa-solid fa-chevron-right"></i>
                </Button>
            </div>
        </div>
    );
};

export default SearchSection;





