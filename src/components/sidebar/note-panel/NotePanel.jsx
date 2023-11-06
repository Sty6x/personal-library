import { useContext } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import notePanelStyles from "./notePanel.module.css";
import { SidebarContext } from "../../../routes/app/App";

const NotePanel = ({ title }) => {
  const { setIsSidebarActive } = useContext(SidebarContext);
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
      <div id="note-panel-btns" className={`${notePanelStyles.notePanelBtnsContainer}`}>
        <button>{title}</button>
        <button
          onClick={() => {
            setIsSidebarActive((prev) => (prev ? false : true));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NotePanel;
