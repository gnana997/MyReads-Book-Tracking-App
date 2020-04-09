import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    comp: [
      {
        title : 'Currently Reading',
        readingState: 'currentlyReading'
      },
      {
        title : 'Want to Read',
        readingState: 'wantToRead'
      },
      {
        title : 'Read',
        readingState: 'read'
      }
    ]
  }

  shelfChange = (books) => {
    this.setState({
      books: [...books]
    })
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: [...data]
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path = '/' render ={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              {this.state.comp.map((c,index) => (
                <div key = {index}>
                  <BookShelf onShelfChange = {this.shelfChange} books = {this.state.books} comp = {c}/>
                </div>
              ))}
          </div>
          )}
        />
        <Route path = '/search' render ={({history}) => (
          <Search books = {this.state.books} onShelfChange = {(books) => {
            this.shelfChange(books)
            history.push('/search')
          }} />
        )} />
      </div>
    )
  }
}

export default BooksApp
