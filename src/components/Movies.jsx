import { useState, useEffect } from "react"
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from 'axios';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [watchList, setWatchList] = useState(() => {
        // Initialize watchList from localStorage
        const savedList = localStorage.getItem("movies");
        return savedList ? JSON.parse(savedList) : [];
    });

    useEffect(() => {
        axios
            .get('https://api.themoviedb.org/3/trending/movie/day', {
                params: {
                    api_key: '8d87c74776a4db389a7098f8195f405c',
                    language: 'en-US',
                    page: pageNo,
                },
            })
            .then((response) => {
                console.log(response.data.results);
                setMovies(response.data.results);
            })
            .catch((e) => console.log(e));
    }, [pageNo]);

    const updateLocalStorage = (updatedList) => {
        localStorage.setItem("movies", JSON.stringify(updatedList));
    };

    const addToWatchList = (movieObj) => {
        const updatedWatchList = [...watchList, movieObj];
        setWatchList(updatedWatchList);
        updateLocalStorage(updatedWatchList); // Update localStorage
    };

    const removeFromWatchList = (movieObj) => {
        const filteredMovies = watchList.filter((movie) => movie.id !== movieObj.id);
        setWatchList(filteredMovies);
        updateLocalStorage(filteredMovies); // Update localStorage
    };

    const handleNext = () => {
        setPageNo(pageNo + 1);
    };

    const handlePrev = () => {
        if (pageNo !== 1) {
            setPageNo(pageNo - 1);
        }
    };

    return (
        <div>
            <div className="text-2xl font-bold text-center">
                <h2>Trending movies</h2>
            </div>
            <div className="flex justify-evenly flex-wrap gap-8">
                {movies.map((movieObj) => (
                    <MovieCard
                        key={movieObj.id}
                        movieObj={movieObj}
                        addToWatchList={addToWatchList}
                        watchList={watchList}
                        removeFromWatchList={removeFromWatchList}
                    />
                ))}
            </div>
            <Pagination pageNumber={pageNo} handlePrevFn={handlePrev} handleNextFn={handleNext} />
        </div>
    );
}

export default Movies;
