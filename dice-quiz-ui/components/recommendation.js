import React, { useState } from 'react';
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa' // Icon for 'like' action

const MovieCard = ({ movie }) => {
  const [liked, setLiked] = useState(false);
  const posterUrl = `https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl transition duration-300 ease-in-out transform hover:scale-105 relative group cursor-pointer">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full object-cover rounded-t-xl group-hover:opacity-10"
      />
      <div className="p-4 bg-gradient-to-b from-transparent to-white">
        <h2 className="text-lg md:text-xl font-bold text-black truncate">
          {movie.title}
        </h2>
        <p className="text-purple-600 text-sm">
          {new Date(movie.release_date).getFullYear()}
        </p>
        <p className="text-blue-400 text-sm">IMDb {movie.vote_average}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out bg-gradient-to-b from-black via-black to-transparent rounded-lg">
        <div className="p-6 text-center">
          <p className="text-white leading-relaxed text-md md:text-lg px-4 line-clamp-3">{movie.overview}</p>
        </div>
      </div>
      <button 
        onClick={toggleLike}
        className={`absolute top-4 right-4 transition duration-300 ${liked ? 'text-red-500 scale-125' : 'text-blue-400 hover:text-blue-500'}`}
      >
        <FaHeart className="text-2xl" />
      </button>
    </div>
  );
}

const MovieRecommendationScreen = ({ userMovies }) => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-500 via-blue-500 to-purple-800 min-h-screen p-10">
      {/* Move the logo to the top of the page on mobile */}
      <div className="absolute top-4 left-4 md:self-start">
        <Link href="/">
          <img src="logo.png" alt="Dice Logo" className="h-12 md:h-16" />
        </Link>
      </div>
      {/* Adjust the header margin for mobile */}
      <h1 className="mt-16 md:mt-0 text-4xl font-bold text-white mb-10">
        Top Picks for You!
      </h1>
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {userMovies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export { MovieRecommendationScreen }