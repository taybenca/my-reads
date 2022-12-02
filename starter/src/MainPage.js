import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import { Title } from "./components/Title"
import { AllShelves } from "./components/AllShelves"

export const MainPage = ({ onChangeShelf, books }) => {
    return (
        <div className="list-books">
            <Title />
            <div className="list-books-content">
                <AllShelves books={books} onChangeShelf={onChangeShelf}/>
            </div>
            <div className="open-search">
                <Link to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    )
}

MainPage.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
}