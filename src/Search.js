import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import useDebounce from './use-debounce';

function Search() {

  const [ query , setQuery] = useState('')
  const [ books, setBooks] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  

  // .then(results => {
  //   // Set back to false since request finished
  //   this.setState({
  //     isSearching : false,
  //     books : results
  //   })
  // });
  const debouncedSearchTerm = useDebounce(query, 1000);
  useEffect(
    () => {
    
      if (debouncedSearchTerm) {
        // Set isSearching state
        setIsSearching(true)
        // Fire off our API call
        BooksAPI.search(debouncedSearchTerm).then(data => {
          setIsSearching(false)
          setBooks(data)
        })
      } else {
        setBooks([])
      }
    },
    [debouncedSearchTerm]
  );
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
          {isSearching && <div>Searching ...</div>}
          <ol className="books-grid">
            {(books.length > 0 && books.map((book, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{width: 128, height: 193,backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <select defaultValue="none" onChange={(event) => this.handleShelfChange(event, book)}>
                          <option disabled value="move"> Move to... </option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {(book.authors && book.authors.map((author, index) => (
                        <p key={index}>{author}</p>
                      )))}
                    </div>
                  </div>
                </li>
              )))}
          </ol>
        </div>
      </div>
    );
  }


// function searchQuery(query){
//   BooksAPI.search(query).then((data) => {
//     this.setBooks(data)
//     this.setIsSearching(false)
//   })
// }


export default Search