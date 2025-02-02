import { useState } from "react";
import Header from "../header/header"; 
import SearchSection from "../search-section/search-section";
import SearchMove from "../search-movie/search-movie"; 
import MoviesSection from "../movies/movies";
import "./main.css";

const Main = () => {
    const [movies, setMovies] = useState([]);  

    return (
        <div className="main">
            <div className="main-container">
                <div className="transparent-background">
                    <Header />
                    <SearchSection setMovies={setMovies} /> 
                </div>
            </div>

            
            <div className="search-results">
                {movies.length > 0 ? (
                    <div className = 'movies-box'>
                        {movies.map((movie) => (
                        <SearchMove key={movie.imdbID} movie={movie} />
                    ))}
                    </div>
                ) : ("")}
            </div>

            <MoviesSection /> 
        </div>
    );
};

export default Main;
