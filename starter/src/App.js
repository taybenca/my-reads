import "./App.css";
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { MainPage } from "./MainPage";
import { SearchPage } from "./SearchPage"

function App() {

  const [books, setBooks] = useState([])
  const [mapOfIdToBooks, setMapOfIdToBook] = useState(new Map())
  const [searchBooks, setSearchBooks] = useState([])
  const [query, setQuery] = useState("")

  //check if the book we search is already in the books array.
  const [mergedBooks, setMergedBooks] = useState([]) 

  const updateQuery = (query) => {
    setQuery(query)
  }

  // getting all the books from API
  useEffect(() => {
    BooksAPI.getAll()
    .then(data => {
      setBooks(data)
      setMapOfIdToBook(createMapOfBooks(data))
    })
  }, [])
  
  // getting books when search for them
  // everytime the query changes, the function will run
  useEffect(() => {
    // avoid undefined value for the query
    let isActive = true

    if (query) {
      BooksAPI.search(query, 20)
      .then(data => {
        if (data.error) {
          setSearchBooks([])
        } else {
          if(isActive){
            setSearchBooks(data)
          }
        }
      })
    }
    return () => {
      isActive = false
      setSearchBooks([])
    }
  }, [query])

  useEffect(() => {
    const combined = searchBooks.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id)
      } else {
        return book
      }
    })
    setMergedBooks(combined)
  }, [searchBooks])

  const createMapOfBooks = (books) => {
    const map = new Map()
    books.map(book => map.set(book.id, book))
    return map
  }

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
        <SearchPage mergedBooks={mergedBooks} 
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
