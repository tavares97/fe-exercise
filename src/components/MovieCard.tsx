import Image from "next/image";
import { useState } from "react";
import { MoviesI } from "../../types/types";
import { getDateYear } from "../../utils/formatDate";
import MovieModal from "./MovieModal";

interface MovieCardProps {
  movie: MoviesI;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { title, poster_path, genres, release_date } = movie;

  return (
    <>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <Image
          src={poster_path}
          alt="movie poster"
          width={300}
          height={0}
          className="w-full max-w-[300px] rounded-t-md"
        />

        <div className="text-white bg-zinc-600 w-full max-w-[300px] p-3 rounded-b-md">
          <p className="text-lg font-bold truncate text-ellipsis overflow-hidden">
            {title}
          </p>
          <div className="text-sm text-yellow-400 truncate text-ellipsis">
            {genres.map((genre, index) => (
              <span className="mr-3 italic" key={index}>
                {genre}
              </span>
            ))}
          </div>

          <p className="text-right mt-4">{getDateYear(release_date)}</p>
        </div>
      </div>

      <MovieModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;
