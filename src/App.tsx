import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';

interface Genre {
  id: number | null;
  name: string;
}

const App:React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genre, setGenre] = useState<Genre>({ id: null, name: '' });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  }

  const handleGenre = (genre: Genre | null) => {
    if (genre) {
      setGenre(genre);
    } else {
      setGenre({ id: null, name: '' });
    }
  }

  const handleToggleClass = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header onSearchQuery={handleSearchQuery} onGenre={handleGenre} onToggleClass={handleToggleClass} />
        <Routes>
          <Route path="/" element={<Home query={searchQuery} genre={genre} isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </BrowserRouter>
    </div>
  );
}

export default App;
