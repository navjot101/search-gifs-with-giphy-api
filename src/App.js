import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'k4zvE7k9rp9n3B5OdM8BwPMigA6P4R85';

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25`
      );
      setGifs(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Giphy GIFs</h1>
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="searchTerm">Search for GIFs:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for GIFs..."
          aria-label="Search for GIFs"
          role="searchbox"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div>
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.downsized_medium.url} alt={gif.title} />
        ))}
      </div>
    </div>
  );
};

export default App;