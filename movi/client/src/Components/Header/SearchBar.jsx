import React from 'react'
import {useState} from 'react'

const SearchBar = () => {

const [searchInput, setSearchInput] = useState("");

const movies = [ 
  { name: "The Mummy", genre: "Action"}

];

const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  
  if (searchInput.length > 0) {
      movies.filter((movie) => {
      return movie.name.match(searchInput);
});
}
  return <div>
    <input
        type = "search"
        placeholder = "Search Media..."
        onChange = {handleChange}
        value = {searchInput}
        size = '40'
        borderRadius = '20' />
        
    <table>
        {movies.map((movie, index) => {
            <tr> 
                <td>{movie.name}</td>
                <td>{movie.genre}</td>
            </tr>
        })}
    </table>
  </div>
};

export default SearchBar;