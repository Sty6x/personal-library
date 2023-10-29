import bookItemStyles from "./bookItem.module.css";

const BookItem = ({ author, title, totalPages, currentPages, isFinished }) => {
  return (
    <li className={`book-item ${bookItemStyles.container}`}>
      <a className={`${bookItemStyles.linkContainer}`}>{title}</a>
    </li>
  );
};

export default BookItem;
