import "./App.css";
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { MainPage } from "./MainPage";
import { SearchPage } from "./SearchPage"

function App() {

  const [books, setBooks] = useState([])
  const [searchBooks, setSearchBooks] = useState([])
  const [query, setQuery] = useState("")

  const updateQuery = (query) => {
    setQuery(query)
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
    <Routes>
      <Route exact path="/" element={
        <MainPage books={books} onChangeShelf={onChangeShelf}/>
      }
      />
      <Route exact path="/search" element={
        <SearchPage searchBooks={searchBooks} 
          onChangeShelf={onChangeShelf}
          updateQuery={updateQuery}
          query={query}
        />
      }
      />
    </Routes>
  );
}


export default App;
