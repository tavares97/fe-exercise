import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

import { MoviesI } from "../../types/types";

import Header from "@/components/Header";
import MovieGrid from "@/components/MovieGrid";

export default function Home() {
  const [movies, setMovies] = useState<MoviesI[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  /* Fetching the movies from the API. */
  useEffect(() => {
    async function fetchMovies() {
      const data = (await axios.get("/api/v1/movies/list")).data;
      setMovies(data);
    }

    fetchMovies();
  }, []);

  /**
   * Handles input changes
   * @param event - React.ChangeEvent<HTMLInputElement>
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  /**
   * Handles when the user presses the Enter key, call the handleSearch function.
   * @param event - React.KeyboardEvent<HTMLInputElement>
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
      setSearchQuery("");
    }
  };

  /**
   * Using useCallback to ensure that it only gets re-created when its dependencies change reducing unnecessary re-renders.
   * Should improve performance
   */
  const handleSearch = useCallback(async () => {
    if (searchQuery.trim().length === 0) return;
    const response = await axios.get(
      `/api/v1/movies/search?searchTerm=${searchQuery}`
    );
    setMovies(response.data);
  }, [searchQuery]);

  return (
    <div className="p-5">
      <Header />

      <div className="flex justify-center mb-8">
        <div className="relative text-black focus-within:text-gray-400 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              className="p-1 focus:outline-none focus:shadow-outline"
              onClick={handleSearch}
            >
              <BiSearchAlt />
            </button>
          </span>
          <input
            type="search"
            name="searchMovie"
            className="w-64 lg:w-[500px] py-2 text-sm text-black bg-zinc-300 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <MovieGrid movies={movies} />
    </div>
  );
}
