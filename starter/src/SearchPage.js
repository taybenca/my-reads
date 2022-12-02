import { Link } from "react-router-dom"
import { Book } from "./components/Book"

export const SearchPage = ({ searchBooks, onChangeShelf, updateQuery, query }) => {
    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(event) => updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchBooks.map(eachBook => (
                        // add unique key for each book
                        <li key={eachBook.id}>
                            <Book book={eachBook} onChangeShelf={onChangeShelf}/>
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}