const BookPanel = () => {
  return (
    <div id="edit-panel" className={`${editPanelStyles.container}`}>
      <div className={`${editPanelStyles.inputsContainer}`}>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder="Title" id="title" />
      </div>
      <div className={`${editPanelStyles.inputsContainer}`}>
        <label htmlFor="author">Author</label>
        <input type="text" placeholder="Author" id="author" />
      </div>
      <span className={`${editPanelStyles.pagesCountContainer}`}>
        <div className={`${editPanelStyles.inputsContainer}`}>
          <label htmlFor="book-pages">Book pages</label>
          <input min={1} type="number" id="book-pages" />
        </div>
        <div className={`${editPanelStyles.inputsContainer}`}>
          <label htmlFor="current-page">Current page</label>
          <input min={0} type="number" id="current-page" />
        </div>
      </span>
    </div>
  );
};

export default BookPanel;
