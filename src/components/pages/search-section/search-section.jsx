import { useEffect, useRef, useReducer } from "react";
import Button from "../../button/button";
import "./search-section.css";


const initialState = {
    value: '',
    timeOutId: null,
};


const reducer = (state, action) => {
    switch (action.type) {
        case "SET_VALUE":
            return { ...state, value: action.payload };
        case "SET_TIMEOUT_ID":
            return { ...state, timeOutId: action.payload };
        case "CLEAR_TIMEOUT":
            return { ...state, timeOutId: null };
        default:
            return state;
    }
};

const SearchSection = ({ 
    handleSavedMoviesClick,
    showSavedMovies,
    setSearchQuery 
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef(null);

    useEffect(()=> {
        inputRef.current.focus();
    },[])

    useEffect(() => {
        if (state.timeOutId) {
            clearTimeout(state.timeOutId); 
        }

        const timer = setTimeout(() => {
            setSearchQuery(state.value); 
        }, 1000); 

        dispatch({ type: "SET_TIMEOUT_ID", payload: timer });

        return () => clearTimeout(timer); 
    }, [state.value, setSearchQuery]); 

    const handleSearchChange = (e) => {
        dispatch({ type: "SET_VALUE", payload: e.target.value }); 
    };

    return (
        <div className="search-section">
            <h1 className="about-movies-text">Unlimited movies, TV shows, and more</h1>
            <p className="question-text">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="search-item-box">
                <input 
                    type="text"
                    ref={inputRef}
                    value={state.value}
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






