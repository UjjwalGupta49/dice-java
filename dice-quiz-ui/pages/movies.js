import React from 'react';
import { useRouter } from 'next/router';
import { MovieRecommendationScreen } from '@/components';

const MoviesPage = () => {
  const router = useRouter();
  // Extract the userMovies query parameter
  const { userMovies } = router.query;

  // Deserialize userMovies from a JSON string back into an array
  let moviesArray;
  try {
    moviesArray = userMovies ? JSON.parse(decodeURIComponent(userMovies)) : [];
  } catch (error) {
    console.error('Error parsing userMovies:', error);
    moviesArray = []; // Fallback to an empty array in case of error
  }

  return (
    <div>
      <MovieRecommendationScreen userMovies={moviesArray} />
    </div>
  );
};

export default MoviesPage;
