import { useContext, useEffect, useRef, useState } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import notePanelStyles from "./notePanel.module.css";
import { SidebarContext } from "../../../routes/app/App";

const NotePanel = ({ title, handleOnSubmit, currentNote }) => {
  const { setIsSidebarActive } = useContext(SidebarContext);
  const [noteContents, setNoteContents] = useState({ contents: "", page: 0 });
  const formRef = useRef();

  function resetInputFields() {
    // if(title)
  }
  useEffect(() => {
    resetInputFields()
  }, [currentNote])


  useEffect(() => {
    currentNote !== undefined && setNoteContents(currentNote);
  }, [currentNote]);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(e, noteContents);
        setIsSidebarActive(false)
      }}
      id="edit-panel"
      className={`${notePanelStyles.container}`}
    >
      <div id="contents-container" className={`${notePanelStyles.editContainer}`}>
        <h3>{title} Note</h3>
        {currentNote !== undefined &&
          <div className={`${notePanelStyles.inputsContainer}`}>
            <label htmlFor="page">Page</label>
            <input
              onChange={(e) => {
                setNoteContents({ ...noteContents, page: e.currentTarget.value })
              }}
              className="inputs"
              type="number"
              id="note-page"
              name="page"
              value={noteContents.page}
            />

          </div>}
        <div className={`${notePanelStyles.inputsContainer}`}>
          <label htmlFor="note-contents">Note Text</label>
          <textarea
            onChange={(e) => {
              setNoteContents({ ...noteContents, contents: e.currentTarget.value });
            }}
            className="inputs"
            type="text"
            id="note-contents"
            name="contents"
            value={noteContents.contents}
          />
        </div>
      </div>
      <div id="color-progress-container" className={`${notePanelStyles.colorProgressContainer}`}>
        <ColorPicker currentColor={currentNote !== undefined ? currentNote.styles.backgroundColor : "#DF7868"} title={"Background"} />
        <ColorPicker currentColor={currentNote !== undefined ? currentNote.styles.textStyles.fill : "#1a1b1d"} title={"Text"} />
      </div>
      <div id="note-panel-btns" className={`${notePanelStyles.notePanelBtnsContainer}`}>
        <button>Confirm</button>
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
