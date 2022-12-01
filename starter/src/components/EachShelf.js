import { Book } from "./Book"

export const EachShelf = ({ books, title, onChangeShelf }) => {
    return (
        <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map(eachBook => (
                        <li key={eachBook.id}>
                            <Book book={eachBook} onChangeShelf={onChangeShelf}/>
                        </li>
                    ))}
                  </ol>
                </div>
              </div>
    )
}