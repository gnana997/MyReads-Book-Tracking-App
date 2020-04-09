import React, {Component} from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Book from './book';

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
                                    <Book book = {book} onHandleShelfChange = {this.handleShelfChange}/>
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