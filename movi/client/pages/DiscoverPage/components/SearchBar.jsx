import React from 'react'
import {useState} from 'react'

const SearchBar = () => {

const [searchInput, setSearchInput] = useState("");

const movies = [
    { name: "The Mummy", genre: "Adventure" },
    { name: "The Simpsons Movie", genre: "Comedy" },
    { name: "Lord of the Rings", genre: "Action" },
    { name: "Game of Thrones", genre: "Period-Drama" },
    { name: "Friday the 13th", genre: "Horror" },
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
        <div>
            <tr> 
                <td>{movie.name}</td>
                <td>{movie.genre}</td>
            </tr>
        </div>
        })}
    </table>
  </div>
};

export default SearchBar;