import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  const movie = {
    adult: false,
    backdrop_path: "/26YLjaC1udGEmSvlM1P5eBGWO5h.jpg",
    genres: ["Action", "Drama"],
    id: 677179,
    original_language: "en",
    original_title: "Creed III",
    direction: "Michael B. Jordan",
    overview: "Two guys fight in a ring until one of them falls unconscious",
    popularity: 300000000000,
    poster_path:
      "https://image.tmdb.org/t/p/w500//cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
    release_date: "2023-02-01",
    title: "Creed III",
    video: false,
    vote_average: 10,
    vote_count: 123123123,
  };

  test("renders the movie title", () => {
    render(<MovieCard movie={movie} />);
    const titleElement = screen.getByText(movie.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the movie poster image", () => {
    render(<MovieCard movie={movie} />);

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", movie.poster_path);
    expect(imageElement).toHaveAttribute("alt", "movie poster");
  });

  test("renders the movie genres", () => {
    render(<MovieCard movie={movie} />);

    const genresElements = movie.genres.map((_, index) =>
      screen.getByTestId(`genre-${index}`)
    );
    expect(genresElements).toHaveLength(movie.genres.length);

    movie.genres.forEach((genre, index) => {
      const genreElement = genresElements[index];
      expect(genreElement).toHaveTextContent(genre);
      expect(genreElement.tagName).toBe("SPAN");
    });
  });
});
