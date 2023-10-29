import libraryPanelStyles from "./libraryPanel.module.css";
import BookItem from "../book-items/BookItem";

const LibraryPanel = () => {
  const placeholders = [
    {
      author: "Haruki Murakami",
      title: "Killing commendatore",
      totalPages: 367,
      currentPage: 0,
      isFinished: false,
    },
  ];

  const mapBookItems = placeholders.map((book) => {
    return <BookItem title={book.title} />;
  });

  return (
    <div id="library-panel" className={`${libraryPanelStyles.container}`}>
      {mapBookItems}
    </div>
  );
};

export default LibraryPanel;
