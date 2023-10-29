import bookItemStyles from "./bookItem.module.css";

const BookItem = ({ author, title, totalPages, currentPages, isFinished }) => {
  return <li className={`book-item ${bookItemStyles.container}`}>{title}</li>;
};

export default BookItem;
