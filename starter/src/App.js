import "./App.css";
import { useEffect, useState } from "react";
import { ChangeSection } from "./components/ChangeSection";
import * as BooksAPI from "./BooksAPI";
import { Title } from "./components/Title";
import { EachShelf } from "./components/EachShelf";
import { AllShelves } from "./components/AllShelves";

function App() {

  const initialBooks = [
    {
      id: 1,
      url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      shelf: "currentlyReading"
    },
    {
      id: 2,
      url: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
      title: "1776",
      author: "David McCullough",
      shelf: "wantToRead"
    },
    {
      id: 3,
      url: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      shelf: "wantToRead"
    },
    {
      id: 4,
      url: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      shelf: "read"
    },
    {
      id: 5,
      url: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
      title: "Oh, the Places You'll Go!",
      author: "Seuss",
      shelf: "read"
    }
  ]

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState(initialBooks)

  // useEffect(() => {
  //   BooksAPI.getAll()
  //   .then(data => setBooks(data))
  // }, [])

  // console.log(books)

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
