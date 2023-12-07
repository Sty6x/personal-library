import libraryPanelStyles from "./libraryPanel.module.css";
import BookItem from "../book-items/BookItem";
import { useContext, useEffect, useState } from "react";
import { LibraryContext, SidebarContext } from "../../../routes/app/App";

const LibraryPanel = () => {
  const { library } = useContext(LibraryContext);
  const [searchBooks, setSearchBooks] = useState([...library]);
  const { addBook } = useContext(SidebarContext);

  function searchQuery(e) {
    e.preventDefault();
    console.log("submit");
    const searchInput = new FormData(e.currentTarget);
    const { text } = Object.fromEntries(searchInput.entries());
    console.log(text);
    if (text === "") {
      setSearchBooks([...library]);
      return;
    } else {
      const searchedBooks = library.filter((book) => book.title.match(text));
      setSearchBooks([...searchedBooks]);
      return;
    }
  }

  function restoreBooks(e) {
    const currentInput = e.target.value;
    currentInput === "" ? setSearchBooks([...library]) : 0;
  }

  useEffect(() => {
    setSearchBooks([...library]);
  }, [library]);
  const displayBookItems = searchBooks.map((book) => {
    return <BookItem key={book.id} book={book} />;
  });

  return (
    <div id="library-panel" className={`${libraryPanelStyles.container}`}>
      <div
        id="library-actions-container"
        className={`${libraryPanelStyles.actionsContainer}`}
      >
        <div
          id="search-library-container"
          className={`${libraryPanelStyles.searchContainer}`}
        >
          <form onSubmit={searchQuery}>
            <input
              onChange={restoreBooks}
              className={`${libraryPanelStyles.searchInput}`}
              type="search"
              placeholder="Search a book title"
              name="text"
              id="searchText"
            />
          </form>
        </div>
        <button
          onClick={(e) => {
            addBook();
          }}
          id="add-book-panel"
          className={`${libraryPanelStyles.addBookBtn} ${libraryPanelStyles.bookBtn}`}
        >
          <svg
            width="30"
            height="29"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12.5"
              cy="12.5"
              r="11.5"
              stroke="#DF7868"
              strokeWidth="2"
            />
            <path
              d="M17.3238 12.8191H13.2667V16.9333H11.6477V12.8191H7.60956V11.3524H11.6477V7.21906H13.2667V11.3524H17.3238V12.8191Z"
              fill="#DF7868"
            />
          </svg>
        </button>
      </div>
      {/* contain mapped book items separately  */}
      <div
        id="library-panel-book-container"
        className={`${libraryPanelStyles.bookItemsContainer}`}
      >
        {searchBooks.length === 0 ? (
          <li className={`${libraryPanelStyles.placeholderBookItem}`}>
            {" "}
            You dont have any books in here, Click on the "+" icon.{" "}
          </li>
        ) : (
          displayBookItems
        )}
      </div>
    </div>
  );
};

export default LibraryPanel;
