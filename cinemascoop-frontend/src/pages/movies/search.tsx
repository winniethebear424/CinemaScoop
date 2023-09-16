import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MovieCard, { IMovieCard } from "@/components/MovieCard";
import Paginate from "@/components/Paginate";

const Page: React.FC = () => {
  const router = useRouter();
  const [searchedResults, setSearchedResults] = useState({
    results: [],
    keyword: '',
    total_pages: 1
  });
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const keyword = router.query.keyword;

    if (keyword) {
      const fetchResults = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&api_key=275df3a012fb3f40f9b17e61610c614a&language=en-US&page=1`);
        const data = await res.json();
        setSearchedResults(data);
      }

      fetchResults();
    }
  }, [router.query]);

  return (
    <main className="mt-5 flex flex-col">
      <div className="w-[1300px] max-w-full px-4 mx-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Search Results</h1>
        </div>
        <div className="grid grid-cols-4 mt-4 gap-4">
          {searchedResults.results.map((movie: IMovieCard) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
        <Paginate
          currentPage={page < 1 || page > searchedResults.total_pages ? 1 : page}
          totalPages={searchedResults.total_pages}
          pageType="top-rated"
        />
      </div>
    </main>
  );
}

export default Page;
