import axios from 'axios';
import React, { useState, useEffect } from 'react'
import StarIcon from '@mui/icons-material/Star';
import Modal from '../../components/Modal/Modal';
import './Home.css';

interface Movies {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface Genre {
  id: number | null;
  name: string;
}

interface HomeProps {
  query: string;
  genre: Genre;
  isDarkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ query, genre, isDarkMode }) => {
  const [genreName, setGenreName] = useState<string>('');
  const [movies, setMovies] = useState<Movies[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aipKey = "0a8d1904066c27fb5552becee7441627";
  const detailEndPoint = "https://api.themoviedb.org/3/movie/";
  const trendingEndPoint = `https://api.themoviedb.org/3/trending/movie/day?include_adult=false`;
  const searchTrendingEndPoint = `https://api.themoviedb.org/3/search/multi?include_adult=false&query=`;
  const moviesByGenreEndPoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&with_genres=`;

  useEffect(() => {
    if (query) {
      console.log(searchTrendingEndPoint + query);
      fetchData(searchTrendingEndPoint + query);
      setGenreName(`Search result of "${query}"`);
    } else if (genre.id) {
      console.log(moviesByGenreEndPoint + genre.id)
      fetchData(moviesByGenreEndPoint + genre.id);
      setGenreName(genre.name);
    } else {
      fetchData(trendingEndPoint);
      setGenreName('Trending');
    }
  }, [query, genre, moviesByGenreEndPoint, searchTrendingEndPoint, trendingEndPoint]);


  const fetchData = (endPoint: string) => {
    axios
      .get(`${endPoint}&api_key=${aipKey}`)
      .then((res) => {
        const result = res.data.results;
        console.log(result);
        setMovies(result);
      })
      .catch(err => console.error(err));
  }

  const fetchMovieDetails = (id: number) => {
    axios
      .get(`${detailEndPoint}${id}?api_key=${aipKey}`)
      .then((res) => {
        const result = res.data;
        console.log(result);
        setSelectedMovie(result);
        fetchMovieVideo(id);
        setIsModalOpen(true);
      })
      .catch(err => console.error(err));
  }

  const fetchMovieVideo = (id: number) => {
    axios
      .get(`${detailEndPoint}${id}/videos?api_key=${aipKey}`)
      .then((res) => {
        const videos = res.data.results;
        console.log(videos);
        const trailer = videos.find((video: any) => video.type === 'Trailer');
        if (trailer) setVideoKey(trailer.key)
      })
      .catch(err => console.error(err));
  }

  const handleMovieClick = (id: number) => {
    fetchMovieDetails(id);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  return (
    <div className={`movies-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h2 className='genre-name'>{genreName}</h2>
      <div className="movies">
        {movies.map((movie) => {
          if (!movie.poster_path) return null;
          return (
            <div
              key={movie.id}
              className="movie"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className='vote-average'>
                <StarIcon
                  style={{ color: movie.vote_average >= 7 ? 'yellow' : '#ccc', fontSize: '70px' }}
                ></StarIcon>
                <p>{typeof movie.vote_average === 'number' ? (movie.vote_average === 10 ? '10' : movie.vote_average.toFixed(1)) : 'N/A'}</p>
              </div>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
              </div>
            </div>
          )
        })}
      </div>
      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={closeModal} isOpen={isModalOpen} videoKey={videoKey} isDarkMode={isDarkMode} />
      )}
    </div>
  )
}

export default Home