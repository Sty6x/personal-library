import bookItemStyles from "./bookItem.module.css";

const BookItem = ({ book: { author, title, totalPages, currentPage, genres, isFinished } }) => {
  return (
    <li className={`book-item ${bookItemStyles.container}`}>
      <a className={`${bookItemStyles.linkContainer}`}>
        <div id="contents" className={`${bookItemStyles.contentsContainer}`}>
          <div id="book-item-progress-container" className={`${bookItemStyles.progressContainer}`}>
            {Math.round((currentPage / totalPages) * 100)}%
          </div>
          <div id="book-item-info" className={`${bookItemStyles.bookInfoContainer}`}>
            <p>{title}</p>
            <span>
              <p>{author}</p>
              <p>
                Pages:{totalPages} | Page: {currentPage}
              </p>
            </span>
            <p>{genres}</p>
          </div>
        </div>
        <div>Updated 1 week ago</div>
      </a>
    </li>
  );
};

export default BookItem;
