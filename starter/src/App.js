import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { Title } from "./components/Title";
import { AllShelves } from "./components/AllShelves";
import { Book } from "./components/Book";

function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([])
  const [searchBooks, setSearchBooks] = useState([])
  const [query, setQuery] = useState("")

  // removes whitespace from both sides of a string and does not change the original string
  const updateQuery = (query) => {
    setQuery(query.trim())
  }

  // getting all the books from API
  useEffect(() => {
    BooksAPI.getAll()
    .then(data => setBooks(data))
  }, [])
  
  // getting books when search for them
  // everytime the query changes, the function will run
  useEffect(() => {
    // avoid undefined value for the query
    if (query) {
      BooksAPI.search(query, 20)
      .then(data => {
        if (data.error) {
          setSearchBooks([])
        } else {
          setSearchBooks(data)
        }
      })
    }
    return () => {
      setSearchBooks([])
    }
  }, [query])

  // update the books in the backend to make sure they will still there when refresh the page
  const onChangeShelf = (book, newShelf) => {
    const updatedBooks = books.map(eachBook => {
      if(eachBook.id === book.id){
        book.shelf = newShelf
        return book
      }
      return eachBook
    })
    setBooks(updatedBooks)
    BooksAPI.update(book, newShelf)
  }
   
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
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
      ) : (
        <div className="list-books">
          <Title />
          <div className="list-books-content">
            <AllShelves books={books} onChangeShelf={onChangeShelf}/>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
