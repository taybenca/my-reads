export const ChangeSection = ({ book, onChangeShelf }) => {
    return (
        <div className="book-shelf-changer">
            {/* the shelf will change after the new shelf is selected */}
            <select 
            defaultValue={book.shelf ? book.shelf : "none"} 
            onChange={(event) => onChangeShelf(book, event.target.value)}
            >
                <option value="disabled" disabled> Move to... </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}