import MovieCard, { IMovieCard } from "@/components/MovieCard";
import Paginate from "@/components/Paginate";
import React from "react";

type Props = {
  topRatedMovies: {
    results: IMovieCard[];
    total_pages: number;
  };
  page: number;
};

const Page: React.FC<Props> = ({ topRatedMovies, page }) => (
  <main className="mt-5 flex flex-col">
    <div className="w-[1300px] max-w-full px-4 mx-auto">
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium">Top Rated Movies</h1>
      </div>
      <div className="grid grid-cols-4 mt-4 gap-4">
        {topRatedMovies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Paginate
        currentPage={page < 1 || page > topRatedMovies.total_pages ? 1 : page}
        totalPages={topRatedMovies.total_pages}
        pageType="top-rated"
      />
    </div>
  </main>
);

export async function getServerSideProps(context:any) {
  const page = context.query.page || 1;

  const topRatedMovies = await getTopRatedMovies(page);

  return {
    props: {
      topRatedMovies,
      page
    },
  };
}

async function getTopRatedMovies(page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
  );
  return res.json();
}

export default Page;
