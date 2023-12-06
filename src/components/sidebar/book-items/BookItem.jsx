import { Link, NavLink } from "react-router-dom";
import bookItemStyles from "./bookItem.module.css";
import { formatDistance } from "date-fns";

const BookItem = ({
  book: {
    link,
    author,
    title,
    totalPages,
    currentPage,
    genre,
    isFinished,
    lastUpdated,
  },
}) => {
  return (
    <li className={`book-item ${bookItemStyles.container}`}>
      <NavLink to={`/${link}`} className={`${bookItemStyles.linkContainer}`}>
        <div
          id="book-item-progress-container"
          className={`${bookItemStyles.progressContainer}`}
        >
          <svg
            version="1.1"
            width="80"
            height="80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              stroke="#DF7868"
              strokeWidth="3"
              cx="50%"
              cy="50%"
              rx="38"
              ry="38"
              fill="none"
            />
            <text
              fontWeight="bold"
              x="51%"
              y="55%"
              fontSize="15"
              textAnchor="middle"
              fill="white"
            >
              {currentPage === 0 && totalPages === 0
                ? 0
                : Math.round((currentPage / totalPages) * 100)}
              %
            </text>
          </svg>
        </div>
        <div id="contents" className={`${bookItemStyles.contentsContainer}`}>
          <div
            id="book-item-info"
            className={`${bookItemStyles.bookInfoContainer}`}
          >
            <p>{title === "" ? "New book" : title}</p>
            <span className={`${bookItemStyles.metaBookInfo}`}>
              <p>Author: {author === "" ? "Book author" : author}</p>
              {totalPages === "" && currentPage === "" ? (
                <p>Pages: 0 | Page: 0</p>
              ) : (
                <p>
                  Pages: {totalPages} | Page: {currentPage}
                </p>
              )}
              <p>
                Genre: {genre.length === 0 ? "Book genres" : genre.join(", ")}
              </p>
            </span>
          </div>

          <div className={bookItemStyles.updateTime}>
            <p>{formatDistance(new Date(), lastUpdated)} ago</p>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default BookItem;
