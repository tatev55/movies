import { useState, useEffect } from "react";
import { api } from "../../api/api";
import "./movie-details.css"

const MoviesDetails = ({id}) => {
    const [movie, setMovie] = useState({});

    useEffect(()=> {
        const getMovies = async() =>{
            try{
                const response = await api.fetchByID(id);
                
                setMovie(response);
                console.log(response);
                
            }catch(error){
                console.log("error:", error);
                
            }
        }
        if(id){
            getMovies();
        }else{
            setMovie({});
        }
    }, [id])



    
    return (
        <div className="movie-details-container">
            <div className="in-movie-details-container">
                <img src={movie?.Poster} alt={movie?.Title}  className="movie-details-img"/>
            </div>
            <div className="in-movie-details-container">
                <p className="genre"><strong>Genre: </strong> {movie?.Genre}</p>
                <p className="writer"><strong>Writer :</strong>{movie?.Writer}</p>
                <p className="plot  "><strong>Plot:</strong>{movie?.Plot}</p>
                <p className="actors"><strong>Actors:</strong>{movie?.Actors}</p>
                <p className="awards"><strong>Awards:</strong>{movie?.Awards}</p>
                <div><strong>{`${movie?.Released}, ${movie?.Runtime}, ${movie?.Language}`}</strong></div>
            </div>
        </div>
    )
}

export default MoviesDetails;