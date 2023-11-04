import bookPanelStyles from "./bookPanel.module.css";

const BookPanel = ({ panelTitle, buttonText, handleButton, handleCancelButton }) => {
  return (
    <div id="book-panel" className={`${bookPanelStyles.container}`}>
      <p>{panelTitle}</p>
      <form className={`${bookPanelStyles.editContainer}`}>
        <div className={`${bookPanelStyles.inputsContainer}`}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Title" id="title" />
        </div>
        <div className={`${bookPanelStyles.inputsContainer}`}>
          <label htmlFor="author">Author</label>
          <input type="text" placeholder="Author" id="author" />
        </div>
        <span className={`${bookPanelStyles.pagesCountContainer}`}>
          <div className={`${bookPanelStyles.inputsContainer}`}>
            <label htmlFor="book-pages">Book pages</label>
            <input min={1} type="number" id="book-pages" />
          </div>
          <div className={`${bookPanelStyles.inputsContainer}`}>
            <label htmlFor="current-page">Current page</label>
            <input min={0} type="number" id="current-page" />
          </div>
        </span>
        <span id="book-panel-btn" className={`${bookPanelStyles.bookPanelBtnContainer}`}>
          <button type="button">{buttonText}</button>
          <button type="button">Cancel</button>
        </span>
      </form>
    </div>
  );
};

export default BookPanel;
