import { useEffect, useState } from "react";
import Header from "../header/header"; 
import SearchSection from "../search-section/search-section";
import SearchMovie from "../search-movie/search-movie"; 
import { Storage } from "../../utils/storage";
import { api } from "../../api/api";
import Modal from "../modal/modal";
import MoviesDetails from "../movie-details/movie-details";
import "./main.css";

const Main = () => {
    const [movies, setMovies] = useState([]);  
    const [isLoading, setLoading] = useState(true) ;
    const [showSavedMovies, setShowSavedMovies] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false) ;  
    const [selectedMovie, setSelectedMovie] = useState(null) ;  

    const savedMovies = Storage.getItem("savedMovies") || [];

    useEffect(() =>{
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("movieId");
        const title = urlParams.get("title");
        const year = urlParams.get("year") ;
        

        if(movieId && title && year){
            setIsModalOpen(true);
            setSelectedMovie({imdbID: movieId, Title:title, Year: year})
        }
        
    },[])

    useEffect(() => {
        setLoading(true);
        const fetchMovies = async () =>{
            const movieData = await api.fetchMoviesBySearch('top');
            if (movieData && movieData.Search) {
                setMovies(movieData.Search);
            }
            setLoading(false);
        };
        fetchMovies(); 
    }, []);

    const handleSavedMoviesClick = () => {
        setShowSavedMovies(!showSavedMovies); 
    };

    const displayMovies = showSavedMovies ? savedMovies : movies ;

    const handleMovieClick = (movie) =>{
        setSelectedMovie(movie);
        setIsModalOpen(true); 
        
        window.history.pushState(
            null, 
            "", 
            `?movieId=${movie.imdbID}&title=${movie.Title}&year=${movie.Year}`)
    };

    
    const handleCloseModal = () => {
        setIsModalOpen(false);  
        setSelectedMovie(null); 
        window.history.pushState("", "", "/")
    };

    return (
        <div className="main">
            <div className="main-container">
                <div className="transparent-background">
                    <Header />
                    <SearchSection 
                        setMovies={setMovies} 
                        handleSavedMoviesClick={handleSavedMoviesClick}
                        showSavedMovies={showSavedMovies}/> 
                </div>
            </div>

            {isLoading ? (
                <p className="text-notFound">Loading Movies...</p>
            ) : (
                <div className="search-results">
                    <h2 className="title">Movies</h2>
                    {showSavedMovies && (
                        <div className="statics">
                            <p>You liked {savedMovies.length} movies</p>
                        </div>  
                    )}
                    {showSavedMovies ? (
                        <div className="saved-movies">
                            {savedMovies.length > 0 ? (
                                savedMovies.map((movie) => (
                                    <SearchMovie key={movie.imdbID} movie={movie} onClick={handleMovieClick} />
                                ))
                            ) : (
                                <p className="text-notFound">No saved movies found.</p>
                            )}
                        </div>
                    ) : (
                        <div className="search-results-list">
                            {displayMovies.length > 0 ? (
                                displayMovies.map((movie) => (
                                    <SearchMovie key={movie.imdbID} movie={movie} onClick={handleMovieClick} />
                                ))
                            ) : (
                                <p className="text-notFound">No movies found</p>
                            )}
                        </div>
                    )}
                </div>
            )}

           
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={handleCloseModal} title={selectedMovie?.Title}>
                    <MoviesDetails id = {selectedMovie?.imdbID}/>
                </Modal>
            )}
        </div>
    );
};

export default Main;
