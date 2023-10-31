import { useContext, useEffect, useState } from "react";
import currentBookTitleStyles from "./currentBookTitle.module.css";
import { LibraryContext } from "../../../routes/app/App";

const CurrentBookTitle = () => {
  const { library } = useContext(LibraryContext);
  const [currentBook, setCurrentBook] = useState({})


  useEffect(() => {
    setCurrentBook((prevState) => {
      const [newState] = library.filter((book) => `/${book.link}` == window.location.pathname)
      return newState
    });
  }, [window.location.pathname])

  return (
    <div id="center-nav" className={`topbarActionContainers ${currentBookTitleStyles.container}`}>
      <span id="book-center-title">{currentBook.title} by {currentBook.author}</span>
      <div id="book-center-props" className={`${currentBookTitleStyles.bookProps}`}>
        <span>
          <p>{currentBook.totalPages}</p>
        </span>
        <span>
          <p>{currentBook.currentPage}</p>
        </span>
        <span>
          <p>
            {Math.round((currentBook.currentPage / currentBook.totalPages) * 100)}%
          </p>
        </span>
      </div>
    </div>
  );
};
export default CurrentBookTitle;
