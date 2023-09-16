import MovieBar from "@/components/MovieBar"
import MovieCard from "./MovieCard";

interface Props{
  upcomingMovies: {
    movies:any,
    classification:string
  };
  popularMovies: {
    movies:any,
    classification:string
  };
  topRatedMovies: {
    movies:any,
    classification:string
  };
  searchResults: any[]; // here we add searchResults to the Props~
}

// export default function Home({props}:{props:Props}) {
  
//   return (
//     <>
//       <main className="mt-5 flex flex-col">
//         <div className="w-[1300px] max-w-full px-4 mx-auto">
//           <MovieBar props={props.upcomingMovies} />
//           <MovieBar props={props.popularMovies} />
//           <MovieBar props={props.topRatedMovies} />
//         </div>
//       </main>
//     </>
//   );
// }

export default function Home({props}:{props:Props}) {
  
  return (
    <>
      <main className="mt-5 flex flex-col">
        <div className="w-[1300px] max-w-full px-4 mx-auto">
          <MovieBar props={props.upcomingMovies} />
          <MovieBar props={props.popularMovies} />
          <MovieBar props={props.topRatedMovies} />
        </div>
      </main>
    </>
  );
}