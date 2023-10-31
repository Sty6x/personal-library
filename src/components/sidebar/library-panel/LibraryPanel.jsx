import libraryPanelStyles from "./libraryPanel.module.css";
import BookItem from "../book-items/BookItem";

const LibraryPanel = () => {
  const placeholders = [
    {
      author: "Haruki Murakamiwdadawdawdwa",
      title: "Killing Commendatore",
      totalPages: 367,
      currentPage: 0,
      isFinished: false,
      genre: ["Physchological", "Fantasy", "History", "Noveldawdawdawdawdwadwadadawd"],
      link: "book1",
    },

    {
      author: "Herman Melville",
      title: "Moby Dick",
      totalPages: 523,
      currentPage: 263,
      isFinished: false,
      genre: ["Epic", "Nautical", "Adventure Fiction"],
      link: "book2",
    },

    {
      author: "Fyodor Dostoyevsky",
      title: "Crime and Punishment",
      totalPages: 490,
      currentPage: 461,
      isFinished: false,
      genre: ["Novel", "Psychological", "Crime", "Philosophical"],
      link: "book3",
    },

    {
      author: "Viktor Frankl",
      title: "Man's Search For Meaning",
      totalPages: 490,
      currentPage: 461,
      isFinished: false,
      genre: ["Biography", "Autobiography", "Personal Narrative"],
      link: "book4",
    },

    {
      author: "Osamu Dazai",
      title: "No Longer Human",
      totalPages: 262,
      currentPage: 152,
      isFinished: false,
      genre: ["Novel", "Fiction"],
      link: "book5",
    },
  ];

  const mapBookItems = placeholders.map((book) => {
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
      {mapBookItems}
    </div>
  );
};

export default LibraryPanel;
