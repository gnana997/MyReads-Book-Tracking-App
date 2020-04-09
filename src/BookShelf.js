import React, {Component} from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component {
    handleShelfChange = (event,book) => {
        const shelf = event.target.value
        BooksAPI.update(book,shelf).then()
        const index = this.props.books.findIndex((b) => {
            return (b.id === book.id)
        })
        this.props.books[index].shelf = event.target.value
        this.props.onShelfChange(this.props.books)
    }

    render() {
        return (
            <div className="list-books-content list-books">
                <div className="list-books-content"></div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.comp.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.filter((book) => (book.shelf === this.props.comp.readingState)).map((book,index) => (
                                <li key = {index}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                            <select defaultValue={book.shelf} onChange = {(event) => this.handleShelfChange(event,book)}>
                                                    <option disabled value="move" >Move to...</option>
                                                    <option  value="currentlyReading">Currently Reading</option>
                                                    <option  value="wantToRead">Want to Read</option>
                                                    <option  value="read">Read</option>
                                                    <option  value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors.map((author,index) => (<p key = {index}>{author}</p>))}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="open-search">
                    <Link to = '/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookShelf