import { useContext } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import notePanelStyles from "./notePanel.module.css";
import { SidebarContext } from "../../../routes/app/App";

const NotePanel = ({ title, handleOnAdd }) => {
  const { setIsSidebarActive } = useContext(SidebarContext);
  return (
    <form onSubmit={handleOnAdd} id="edit-panel" className={`${notePanelStyles.container}`}>
      <div id="edit-contents-container" className={`${notePanelStyles.editContainer}`}>
        <div className={`${notePanelStyles.inputsContainer}`}>
          <label htmlFor="note-contents">{title}</label>
          <textarea type="text" id="note-contents" name="contents" />
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
          type="button"
          onClick={() => {
            setIsSidebarActive((prev) => (prev ? false : true));
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NotePanel;
