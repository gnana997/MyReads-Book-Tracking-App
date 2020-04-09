import React , {Component} from 'react'

class Book extends Component{
    
    render(){
        let shelf = ''
        if(this.props.book.shelf){
            shelf = this.props.book.shelf
        }else{
            shelf = this.props.onDefaultValue(this.props.book)
        }
        return (
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${(this.props.book.imageLinks && this.props.book.imageLinks.thumbnail)})`,
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  defaultValue={shelf}
                  onChange={(event) => this.props.onHandleShelfChange(event, this.props.book)}
                >
                  <option disabled value="move">
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">
              {(this.props.book.author && this.props.book.authors.map((author, index) => (
                <p key={index}>{author}</p>
              )))}
            </div>
          </div>
        );
    }
}

export default Book