import { EachShelf } from './EachShelf'

export const AllShelves = ({ books, onChangeShelf }) => {
    // the shelves will filter the books that has the corresponding shelf
    const currentlyReading = books.filter(
        (book) => (book.shelf === "currentlyReading")
    )

    const wantToRead = books.filter(
        (book) => (book.shelf === "wantToRead")
    )

    const read = books.filter(
        (book) => (book.shelf === "read")
    )

    return (
        <div>
            <EachShelf title='Currently Reading' 
                books={currentlyReading} 
                onChangeShelf={onChangeShelf} 
            />
            <EachShelf title='Want to Read' 
                books={wantToRead} 
                onChangeShelf={onChangeShelf}
            />
            <EachShelf title='Read' 
                books={read} 
                onChangeShelf={onChangeShelf}
            />
        </div>
    )
}