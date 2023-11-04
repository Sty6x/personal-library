import editPanelStyles from "./editPanel.module.css";

const EditPanel = () => {
  return (
    <div id="edit-panel" className={`${editPanelStyles.container}`}>
      <div id="edit-contents-container" className={`${editPanelStyles.editContainer}`}>
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
            <input type="number" id="book-pages" />
          </div>
          <div className={`${editPanelStyles.inputsContainer}`}>
            <label htmlFor="current-page">Current page</label>
            <input type="number" id="current-page" />
          </div>
        </span>
        <div className={`${editPanelStyles.inputsContainer}`}>
          <label htmlFor="note-contents">Title</label>
          <textarea type="text" placeholder="Title" id="note-contents" />
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
