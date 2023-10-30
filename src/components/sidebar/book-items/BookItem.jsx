import bookItemStyles from "./bookItem.module.css";

const BookItem = ({ book: { author, title, totalPages, currentPage, genres, isFinished } }) => {
  return (
    <li className={`book-item ${bookItemStyles.container}`}>
      <a className={`${bookItemStyles.linkContainer}`}>
        <div id="book-item-progress-container" className={`${bookItemStyles.progressContainer}`}>
          {totalPages - currentPage / 100}
        </div>
        <div id="book-item-info">
          <p>
            {title} {author}
          </p>
          <span>
            <p>
              Pages:{totalPages} | Page: {currentPage}
            </p>
          </span>
          <p>{genres}</p>
        </div>
        <div>Updated 1 week ago</div>
      </a>
    </li>
  );
};

export default BookItem;
