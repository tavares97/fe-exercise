import { MoviesI } from "../../types/types";
import MovieInfo from "./MovieCard";

interface MovieGridProps {
  movies: MoviesI[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      {movies.map((movie) => (
        <MovieInfo movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieGrid;
