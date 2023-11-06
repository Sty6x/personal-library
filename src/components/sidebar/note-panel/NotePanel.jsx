import ColorPicker from "./color-picker/ColorPicker";
import notePanelStyles from "./notePanel.module.css";

const NotePanel = ({ title }) => {
  return (
    <div id="edit-panel" className={`${notePanelStyles.container}`}>
      <div id="edit-contents-container" className={`${notePanelStyles.editContainer}`}>
        <div className={`${notePanelStyles.inputsContainer}`}>
          <label htmlFor="note-contents">{title}</label>
          <textarea type="text" id="note-contents" />
        </div>
      </div>
      <div id="color-progress-container" className={`${notePanelStyles.colorProgressContainer}`}>
        <ColorPicker title={"Background"} />
        {/* <ColorPicker title={"Stroke"} /> */}
        <ColorPicker title={"Text"} />
      </div>
    </div>
  );
};

export default NotePanel;
