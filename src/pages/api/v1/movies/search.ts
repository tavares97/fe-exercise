import type { NextApiRequest, NextApiResponse } from "next";
import data from "./data.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchTerm = req.query.searchTerm as string;

    const movies = data.results.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const searchedMovies = movies.map((movie) => ({
      ...movie,
      poster_path: `${process.env.IMAGES_BASE_PATH}${movie.poster_path}`,
    }));

    res.status(200).json(searchedMovies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
