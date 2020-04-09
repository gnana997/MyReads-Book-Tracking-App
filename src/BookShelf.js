import React, {Component} from 'react';

class BookShelf extends Component {
    handleShelfChange = (event,book) => {
        console.log(event.target.value,book, "trigger")
        const index = this.props.books.findIndex((b) => {
            return (b.title === book.title)
        })
        this.props.books[index].readingState = event.target.value
        this.props.ShelfChange(this.props.books)
    }

    optionClick = (book) => (event) =>{
        console.log("t2");
        this.handleShelfChange(event,book)
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.comp.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.filter((book) => (book.readingState === this.props.comp.readingState)).map((book,index) => (
                            <li key = {index}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.image})` }}></div>
                                        <div className="book-shelf-changer">
                                        <select defaultValue={this.props.comp.readingState} onChange = {(event) => this.handleShelfChange(event,book)}>
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
        )
    }
}

export default BookShelf