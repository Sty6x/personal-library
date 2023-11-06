import libraryPanelStyles from "./libraryPanel.module.css";
import BookItem from "../book-items/BookItem";
import { useContext } from "react";
import { LibraryContext } from "../../../routes/app/App";

const LibraryPanel = () => {
  const { library } = useContext(LibraryContext);

  const mapBookItems = library.map((book) => {
    return <BookItem book={book} />;
  });

  return (
    <div id="library-panel" className={`${libraryPanelStyles.container}`}>
      <div id="library-actions-container" className={`${libraryPanelStyles.actionsContainer}`}>
        <div id="search-library-container" className={`${libraryPanelStyles.searchContainer}`}>
          <input
            className={`${libraryPanelStyles.searchInput}`}
            type="search"
            placeholder="Search a book"
          />
        </div>
        <button
          onClick={(e) => {
            addBook();
            // activateSidebar();
            // returnSidebarBtn(e);
            // setCurrentActivePanel(e.currentTarget.id);
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
            <circle cx="12.5" cy="12.5" r="11.5" stroke="#DF7868" strokeWidth="2" />
            <path
              d="M17.3238 12.8191H13.2667V16.9333H11.6477V12.8191H7.60956V11.3524H11.6477V7.21906H13.2667V11.3524H17.3238V12.8191Z"
              fill="#DF7868"
            />
          </svg>
        </button>
      </div>
      {/* contain mapped book items separately  */}
      <div id="library-panel-book-container" className={`${libraryPanelStyles.bookItemsContainer}`}>
        {mapBookItems}
      </div>
    </div>
  );
};

export default LibraryPanel;
