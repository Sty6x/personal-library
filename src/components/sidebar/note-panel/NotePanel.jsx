import { useContext, useEffect, useRef, useState } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import notePanelStyles from "./notePanel.module.css";
import { SidebarContext } from "../../../routes/app/App";

const NotePanel = ({ title, handleOnSubmit, currentNote }) => {
  const { setIsSidebarActive } = useContext(SidebarContext);
  const [newContents, setNewContents] = useState();
  const formRef = useRef();
  useEffect(() => {
    setNewContents(currentNote === undefined ? "" : currentNote.contents);
    console.log(newContents);
  }, [currentNote]);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(e, newContents);
      }}
      id="edit-panel"
      className={`${notePanelStyles.container}`}
    >
      <div id="edit-contents-container" className={`${notePanelStyles.editContainer}`}>
        <div className={`${notePanelStyles.inputsContainer}`}>
          <label htmlFor="note-contents">{title}</label>
          <textarea
            onChange={(e) => {
              setNewContents(e.currentTarget.value);
            }}
            className="inputs"
            type="text"
            id="note-contents"
            name="contents"
            value={newContents}
          />
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
