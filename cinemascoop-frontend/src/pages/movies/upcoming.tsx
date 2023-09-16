import MovieCard, { IMovieCard } from "@/components/MovieCard";
import Paginate from "@/components/Paginate";
import React from "react";

type Props = {
  upcomingMovies: {
    results: IMovieCard[];
    total_pages: number;
  };
  page: number;
};

const Page: React.FC<Props> = ({ upcomingMovies, page }) => (
  <main className="mt-5 flex flex-col">
    <div className="w-[1300px] max-w-full px-4 mx-auto">
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium">Upcoming Movies</h1>
      </div>
      <div className="grid grid-cols-4 mt-4 gap-4">
        {upcomingMovies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Paginate
        currentPage={page < 1 || page > upcomingMovies.total_pages ? 1 : page}
        totalPages={upcomingMovies.total_pages}
        pageType="upcoming"
      />
    </div>
  </main>
);

export async function getServerSideProps(context:any) {
  const page = context.query.page || 1;

  const upcomingMovies = await getUpcomingMovies(page);

  return {
    props: {
      upcomingMovies,
      page
    },
  };
}

async function getUpcomingMovies(page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
  );
  return res.json();
}

export default Page;
