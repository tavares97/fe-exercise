export interface MoviesI {
  adult: boolean;
  backdrop_path: string;
  genres: string[];

  id: number;
  original_language: string;
  original_title: string;
  direction: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
