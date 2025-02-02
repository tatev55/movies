import "./search-movie.css";



const SearchMove = ({movie}) => {
    
    
    return (
        <div className="container">
            <div className="move">
                <div className="box-image">
                    <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                </div>
                <div className="box-description">
                    <h3 className="movie-title">{movie.Title}</h3>
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Type:</strong> {movie.Type}</p> 
            
                </div>

            </div>
        </div>
    )
}

export default SearchMove;