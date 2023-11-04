import editPanelStyles from "./editPanel.module.css";

const EditPanel = () => {
  return (
    <div id="edit-panel" className={`${editPanelStyles.container}`}>
      <div id="edit-contents-container" className={`${editPanelStyles.editContainer}`}>
        <div className={`${editPanelStyles.inputsContainer}`}>
          <label htmlFor="note-contents">Edit note</label>
          <textarea type="text" placeholder="edit" id="note-contents" />
        </div>
      </div>
      <div
        id="color-progress-container"
        className={`${editPanelStyles.colorProgressContainer}`}
      ></div>
    </div>
  );
};

export default EditPanel;
