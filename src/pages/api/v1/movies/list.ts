import type { NextApiRequest, NextApiResponse } from "next";
import data from "./data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    /**Taking the data from the data.json file and mapping it to the movies variable,
     * adds the correct path to the images and returns it
     *  */
    const movies = data.results.map((movie) => ({
      ...movie,
      poster_path: `${process.env.IMAGES_BASE_PATH}${movie.poster_path}`,
    }));

    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
