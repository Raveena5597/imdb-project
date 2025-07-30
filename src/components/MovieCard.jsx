function MovieCard(props) {
    const { movieObj, addToWatchList, watchList, removeFromWatchList } = props;
    const isMoviePresentInWatchList = (movieObj) => {
        // for watchlist array, check if movieObj is presnet in arr or not. if present return true, else false.
        const res = watchList.some((movie) => movie.id === movieObj.id);
        return res;
    }

    return (
        <div
            className="relative h-[40vh] w-[200px] bg-cover bg-center flex flex-col rounded-2xl overflow-hidden"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObj.poster_path})`
            }}
        >
            <div
                className="absolute top-4 right-4 group bg-gray-700/50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
                onClick={() =>
                    isMoviePresentInWatchList(movieObj) ? removeFromWatchList(movieObj) : addToWatchList(movieObj)
                }
                role="button"
            >
                {isMoviePresentInWatchList(movieObj) ? (
                    '❌'
                ) : (
                    // White Heart SVG
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                    </svg>
                )}
                {/* Hover Message */}
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white text-xs bg-black p-1 rounded z-10">
                    Add to Watchlist
                </span>
            </div>

            {/* Movie Title */}
            <div className="absolute bottom-0 bg-gray-700/50 text-white text-center w-full p-2 rounded-b-2xl">
                {movieObj.title}
            </div>
        </div>
    );
}

export default MovieCard