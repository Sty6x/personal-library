import libraryPanelStyles from "./libraryPanel.module.css";
import BookItem from "../book-items/BookItem";

const LibraryPanel = () => {
  const placeholders = [
    {
      author: "Haruki Murakami",
      title: "Killing Commendatore",
      totalPages: 367,
      currentPage: 0,
      isFinished: false,
    },

    {
      author: "Herman Melville",
      title: "Moby Dick",
      totalPages: 523,
      currentPage: 263,
      isFinished: false,
    },

    {
      author: "Fyodor Dostoyevsky",
      title: "Crime and Punishment",
      totalPages: 490,
      currentPage: 461,
      isFinished: false,
    },

    {
      author: "Viktor Frankl",
      title: "Man's Search For Meaning",
      totalPages: 490,
      currentPage: 461,
      isFinished: false,
    },

    {
      author: "Osamu Dazai",
      title: "No Longer Human",
      totalPages: 262,
      currentPage: 152,
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
