import PropTypes from "prop-types";
import { ChangeSection } from "./ChangeSection"

export const Book = ({ book, onChangeShelf }) => {
    return (
        <div className="book">
            <div className="book-top">
                <div
                className="book-cover"
                style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                    `url(${book.imageLinks.thumbnail})`
                }}
                >
                </div>
                <ChangeSection book={book} onChangeShelf={onChangeShelf}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

Book.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
}