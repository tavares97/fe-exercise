import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MoviesI } from "../../types/types";

export default function Home() {
  const [movies, setMovies] = useState<MoviesI[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = (await axios.get("/api/v1/movies/list")).data;
      setMovies(data);
    }

    fetchMovies();
  }, []);

  console.log(movies);
  return (
    <>
      <Head>
        <title>Movie Search App</title>
      </Head>
      <h1>works</h1>
    </>
  );
}
