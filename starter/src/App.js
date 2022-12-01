import "./App.css";
import { useEffect, useState } from "react";
import { ChangeSection } from "./components/ChangeSection";
import * as BooksAPI from "./BooksAPI";
import { Title } from "./components/Title";
import { EachShelf } from "./components/EachShelf";
import { AllShelves } from "./components/AllShelves";

function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([])

  useEffect(() => {
    BooksAPI.getAll()
    .then(data => setBooks(data))
  }, [])

  const onChangeShelf = (book, newShelf) => {
    const updatedBooks = books.map(eachBook => {
      if(eachBook.id === book.id){
        book.shelf = newShelf
        return book
      }
      return eachBook
    })
    setBooks(updatedBooks)
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
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
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
