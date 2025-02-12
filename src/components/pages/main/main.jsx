import { useEffect, useReducer} from "react";
import Header from "../../header/header";
import SearchSection from "../search-section/search-section";
import SearchMovie from "../search-movie/search-movie";
import { Storage } from "../../../utils/storage";
import { api } from "../../../api/api";
import Modal from "../../modal/modal";
import MoviesDetails from "../../movie-details/movie-details";
import Pagination from "../../pagination/pagination";
import "./main.css";

const initialState ={
    movies: [],
    isLoading: true,
    showSavedMovies: false,
    isModalOpen: false,
    selectedMovie: null,
    totalPages: 1,
    currentPage: 1,
    searchQuery: "",

};

const MoviesReducer = (state, action) => {
    switch (action.type) {
        case "SET_MOVIES":
            return { ...state, movies: action.payload.movies, totalPages: action.payload.totalPages };
        case "SET_LOADING":
            return { ...state, isLoading: action.payload };
        case "SET_SHOW_SAVED_MOVIES":
            return { ...state, showSavedMovies: action.payload };
        case "SET_MODAL_OPEN":
            return { ...state, isModalOpen: action.payload };
        case "SET_SELECTED_MOVIE":
            return { ...state, selectedMovie: action.payload };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload };
        default:
            return state;
    }
};

const Main = () => { 
    const [state, dispatch] = useReducer(MoviesReducer, initialState);

    const savedMovies = Storage.getItem("savedMovies") || [];

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("movieId");
        const title = urlParams.get("title");
        const year = urlParams.get("year");

        if(movieId && title && year){
            dispatch({ type: "SET_MODAL_OPEN", payload: true });
            dispatch({ type: "SET_SELECTED_MOVIE", payload: { imdbID: movieId, Title: title, Year: year } });
        }
    }, []);

  
    useEffect(() => {
        dispatch({ type: "SET_LOADING", payload: true });
        const fetchMovies = async () => {
            let movieData;
            if (state.searchQuery) {
                movieData = await api.fetchMoviesBySearch(state.searchQuery, state.currentPage);  
                
            } else {
                movieData = await api.fetchMoviesBySearch("top", state.currentPage);
        
    
                
            }

            if (movieData && movieData.Search) {
                dispatch({
                    type: "SET_MOVIES",
                    payload: {
                        movies: movieData.Search,
                        totalPages: Math.ceil(movieData.totalResults / 10),
                    },
                });

            
            }
            dispatch({ type: "SET_LOADING", payload: false });
          
        };
        fetchMovies();
    }, [state.currentPage, state.searchQuery]);

    const handleSavedMoviesClick = () => {
        dispatch({ type: "SET_SHOW_SAVED_MOVIES", payload: !state.showSavedMovies });
    };

    const displayMovies = state.showSavedMovies ? savedMovies : state.movies;

    const handleMovieClick = (movie) => {
         
        dispatch({ type: "SET_SELECTED_MOVIE", payload: movie });
        dispatch({ type: "SET_MODAL_OPEN", payload: true });
        window.history.pushState(
            null, 
            "", 
            `?movieId=${movie.imdbID}&title=${movie.Title}&year=${movie.Year}`
        );
    };

    const handleCloseModal = () => {
        dispatch({ type: "SET_MODAL_OPEN", payload: false });
        dispatch({ type: "SET_SELECTED_MOVIE", payload: null });
        window.history.pushState("", "", "/");
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= state.totalPages) {
    
            dispatch({ type: "SET_CURRENT_PAGE", payload: page });
        }
    };
   
    

    return (
        <div className="main">
            <div className="main-container">
                <div className="transparent-background">
                    <Header />
                    <SearchSection 
                        handleSavedMoviesClick={handleSavedMoviesClick}
                        showSavedMovies={state.showSavedMovies}
                        currentPage={state.currentPage}
                        setCurrentPage={(page) => dispatch({ type: "SET_CURRENT_PAGE", payload: page })}
                        setSearchQuery={(query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query })}
                    />
                </div>
            </div>

            {state.isLoading ? (
                <div className = "loading">
                    <p className="text-notFound">Loading Movies...</p>
                </div>
            ) : (
                <div className="search-results">
                    <h2 className="title">Movies</h2>
                    {state.showSavedMovies && (
                        <div className="statics">
                            <p>You liked {savedMovies.length} movies</p>
                        </div>  
                    )}
                    {state.showSavedMovies ? (
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
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                onPageChange={handlePageChange}
            />

            {state.isModalOpen && (
                <Modal open={state.isModalOpen} onClose={handleCloseModal} title={state.selectedMovie?.Title}>
                    <MoviesDetails id={state.selectedMovie?.imdbID} />
                </Modal>
            )}
        </div>
    );
};

export default Main;
