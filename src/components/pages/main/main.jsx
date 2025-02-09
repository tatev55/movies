import { useEffect, useState } from "react";
import Header from "../../header/header";
import SearchSection from "../search-section/search-section";
import SearchMovie from "../search-movie/search-movie";
import { Storage } from "../../../utils/storage";
import { api } from "../../../api/api";
import Modal from "../../modal/modal";
import MoviesDetails from "../../movie-details/movie-details";
import Pagination from "../../pagination/pagination";
import "./main.css";

const Main = () => {
    const [movies, setMovies] = useState([]);  
    const [isLoading, setLoading] = useState(true);
    const [showSavedMovies, setShowSavedMovies] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [selectedMovie, setSelectedMovie] = useState(null); 
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); 

    const savedMovies = Storage.getItem("savedMovies") || [];

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("movieId");
        const title = urlParams.get("title");
        const year = urlParams.get("year");

        if(movieId && title && year){
            setIsModalOpen(true);
            setSelectedMovie({imdbID: movieId, Title:title, Year: year});
        }
    }, []);

  
    useEffect(() => {
        setLoading(true);
        const fetchMovies = async () => {
            if (searchQuery) {
                
                const movieData = await api.fetchMoviesBySearch(searchQuery, currentPage);
                if (movieData && movieData.Search) {
                    setMovies(movieData.Search);
                    setTotalPages(Math.ceil(movieData.totalResults / 10));
                }
            } else {
                
                const movieData = await api.fetchMoviesBySearch("top", currentPage);
                if (movieData && movieData.Search) {
                    setMovies(movieData.Search);
                    setTotalPages(Math.ceil(movieData.totalResults / 10));
                }
            }
            setLoading(false);
        };
        fetchMovies();
    }, [currentPage, searchQuery]);

    const handleSavedMoviesClick = () => {
        setShowSavedMovies(!showSavedMovies);
    };

    const displayMovies = showSavedMovies ? savedMovies : movies;

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true); 
        window.history.pushState(
            null, 
            "", 
            `?movieId=${movie.imdbID}&title=${movie.Title}&year=${movie.Year}`
        );
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);  
        setSelectedMovie(null); 
        window.history.pushState("", "", "/");
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
   
    

    return (
        <div className="main">
            <div className="main-container">
                <div className="transparent-background">
                    <Header />
                    <SearchSection 
                        handleSavedMoviesClick={handleSavedMoviesClick}
                        showSavedMovies={showSavedMovies}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setSearchQuery={setSearchQuery} 
                    />
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
                                    <SearchMovie key={`${movie.imdbID}-${movie.Year}`} movie={movie} onClick={handleMovieClick} />
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {isModalOpen && (
                <Modal open={isModalOpen} onClose={handleCloseModal} title={selectedMovie?.Title}>
                    <MoviesDetails id={selectedMovie?.imdbID} />
                </Modal>
            )}
        </div>
    );
};

export default Main;
