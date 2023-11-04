import { useContext, useEffect } from "react";
import bookPanelStyles from "./bookPanel.module.css";
import { SidebarContext } from "../../../routes/app/App";

const BookPanel = ({ panelTitle, buttonText, handleButton, currentBook }) => {
  const { setIsSidebarActive } = useContext(SidebarContext);
  useEffect(() => {
    console.log(currentBook);
  }, [window.location.pathname]);
  return (
    <div id="book-panel" className={`${bookPanelStyles.container}`}>
      <p>{panelTitle}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const formEntries = Object.fromEntries(formData.entries());
          console.log(formEntries);
          handleButton(formEntries);
        }}
        className={`${bookPanelStyles.editContainer}`}
      >
        <div className={`${bookPanelStyles.inputsContainer}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            // placeholder={"Title"}
            name="title"
            id="title"
            defaultValue={currentBook ? currentBook.title : ""}
          />
        </div>
        <div className={`${bookPanelStyles.inputsContainer}`}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            // placeholder="Author"
            name="author"
            id="author"
            defaultValue={currentBook ? currentBook.author : ""}
          />
        </div>
        <span className={`${bookPanelStyles.pagesCountContainer}`}>
          <div className={`${bookPanelStyles.inputsContainer}`}>
            <label htmlFor="book-pages">Book pages</label>
            <input
              min={0}
              type="number"
              name="totalPages"
              id="book-pages"
              defaultValue={currentBook ? currentBook.totalPages : 0}
            />
          </div>
          <div className={`${bookPanelStyles.inputsContainer}`}>
            <label htmlFor="current-page">Current page</label>
            <input
              min={0}
              type="number"
              name="currentPage"
              id="current-page"
              defaultValue={currentBook ? currentBook.totalPages : 0}
            />
          </div>
        </span>
        <span id="book-panel-btn" className={`${bookPanelStyles.bookPanelBtnContainer}`}>
          <button>{buttonText}</button>
          <button
            onClick={() => {
              setIsSidebarActive((prev) => (prev ? false : true));
            }}
            type="button"
          >
            Cancel
          </button>
        </span>
      </form>
    </div>
  );
};

export default BookPanel;
