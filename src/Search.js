import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI';
import * as _ from 'lodash';
import Book from './book'

class Search extends Component{
  
    state = {
        books: [],
        query: ''
    }


    componentDidUpdate(prevProps,prevState){
      if(prevState.query !== this.state.query){
        if(this.state.query === ''){
          this.setState({
            books: []
          })
        }else{
          BooksApi.search(this.state.query).then((data) => {
            const booksData = (data && data.error) ? [] : data;
              this.setState({
                books: booksData
              })
            })
          }
        }
        
    }

    handlechange = e =>{
      e.persist();
      if (!this.debouncedFn) {
        this.debouncedFn =  _.debounce(() => {
          let searchString = e.target.value;
          this.setState({
            query: searchString
          });
        }, 300);
      }
        this.debouncedFn();
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
                    onChange={this.handlechange}
                  />
                  

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {(this.state.books &&
                  this.state.books.map((book, index) => (
                    <li key={index}>
                      <Book book = {book} onHandleShelfChange = {this.handleShelfChange} onDefaultValue = {this.defaultValue}/>
                    </li>
                  )))}
              </ol>
            </div>
          </div>
        );
    }
}

export default Search