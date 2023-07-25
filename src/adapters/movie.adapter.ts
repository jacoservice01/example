export const createMovieAdapter = (movie: any) => ({
    imdbID: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type,
    poster: movie.Poster
  });