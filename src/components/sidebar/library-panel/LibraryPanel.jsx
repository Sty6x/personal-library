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
      <div id="search-library-container" className={`${libraryPanelStyles.searchContainer}`}>
        <input
          className={`${libraryPanelStyles.searchInput}`}
          type="search"
          placeholder="Search a book"
        />
      </div>
      {/* contain mapped book items separately  */}
      <div id="library-panel-book-container" className={`${libraryPanelStyles.bookItemsContainer}`}>
        {mapBookItems}
      </div>
    </div>
  );
};

export default LibraryPanel;
