import bookItemStyles from "./bookItem.module.css";

const BookItem = ({ book: { author, title, totalPages, currentPage, genre, isFinished } }) => {
  return (
    <li className={`book-item ${bookItemStyles.container}`}>
      <a className={`${bookItemStyles.linkContainer}`}>
        <div id="contents" className={`${bookItemStyles.contentsContainer}`}>
          <div id="book-item-progress-container" className={`${bookItemStyles.progressContainer}`}>
            <svg version="1.1" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
              <ellipse
                stroke="#DF7868"
                strokeWidth="3"
                cx="50%"
                cy="50%"
                rx="28"
                ry="28"
                fill="none"
              />
              <text
                fontWeight="bold"
                x="51%"
                y="59%"
                font-size="15"
                text-anchor="middle"
                fill="white"
              >
                {Math.round((currentPage / totalPages) * 100)}%
              </text>
            </svg>
          </div>
          <div id="book-item-info" className={`${bookItemStyles.bookInfoContainer}`}>
            <p>{title}</p>
            <span className={`${bookItemStyles.metaBookInfo}`}>
              <p>{author}</p>
              <p>
                Pages: {totalPages} | Page: {currentPage}
              </p>
              <p>{genre.join(", ")}</p>
            </span>
          </div>
        </div>
        <div>Updated 1 week ago</div>
      </a>
    </li>
  );
};

export default BookItem;
