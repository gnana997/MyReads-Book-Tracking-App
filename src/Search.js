import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI';

class Search extends Component{

  state = {
    books: [],
    query: ''
  }

    componentDidUpdate(prevProps,prevState){
      if(prevState.query !== this.state.query){
        BooksApi.search(this.state.query).then((data) => {
          const booksData = data.error ? [] : data;
          this.setState({
            books: booksData
          })
      })
      }
    }

    handelchange = e =>{
      e.preventDefault()
      const query = e.target.value
      this.setState({
        query: query
      })
    }

    handleShelfChange = (event,book) => {
      event.preventDefault()
      let propBooks = [...this.props.books]
      const shelf = event.target.value
      BooksApi.update(book,shelf).then()
      const index = this.props.books.findIndex((b) => {
        return (b.id === book.id)
      })
      if(index === -1){
        book['shelf'] = shelf
        propBooks = [...propBooks, book]
      }else{
        propBooks[index].shelf = shelf
      }
      this.props.onShelfChange(propBooks)
    }

    defaultValue =  (book) => {
      const index = this.props.books.findIndex(b =>{
        return b.id === book.id
      })
      if(index === -1){
        return 'none'
      }else{
        return this.props.books[index].shelf
      }
    }

    render() {
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
                  value={this.state.query}
                  onChange={this.handelchange}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books &&
                  this.state.books.map((book, index) => (
                    <li key={index}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks &&
                                book.imageLinks.thumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select
                              defaultValue={this.defaultValue(book)}
                              onChange={(event) =>
                                this.handleShelfChange(event, book)
                              }
                            >
                              <option disabled value="move">
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                          {book.authors &&
                            book.authors.map((author, index) => (
                              <p key={index}>{author}</p>
                            ))}
                        </div>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        );
    }
}

export default Search