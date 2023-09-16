import React, { useState } from 'react';
import Content from '@/components/Content';


// import MovieCard from '@/components/MovieCard'; 
interface IMovieCard {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export async function getServerSideProps() {
  const fetchMovies = async (type:any) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.API_KEY}&language=en-US`);
    const data = await res.json();
    return data;
  };

  const upcomingMovies = await fetchMovies("upcoming");
  const popularMovies = await fetchMovies("popular");
  const topRatedMovies = await fetchMovies("top_rated");

//function Index({ movies }:any) {

  // const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = async (query: string) => {
  //   try {
  //     const results = await searchedMovie(query);
  //     setSearchResults(results);
  //   } catch (error) {
  //     console.error('Failed to fetch search results', error);
  //   }
  // };


  return {
    props: {
      movies: {
        upcomingMovies: { movies: upcomingMovies || [],type:"upcoming",classification: "Upcoming" },
        popularMovies: { movies: popularMovies || [],type:"popular", classification: "Popular" },
        topRatedMovies: { movies: topRatedMovies || [],type:"top_rated" ,classification: "Top Rated" },
      }
    }
  };
}

function Index({ movies }:any) {
  return (
    <>
      <Content props={movies} />
    </>
  )
}

export default Index;
