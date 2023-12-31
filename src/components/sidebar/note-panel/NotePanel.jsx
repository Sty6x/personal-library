import { useContext, useEffect, useRef, useState } from "react";
import ColorPicker from "./color-picker/ColorPicker";
import notePanelStyles from "./notePanel.module.css";
import { SidebarContext } from "../../../routes/app/App";
import PanelBtn from "../../book-components/panel-btn/PanelBtn";
import {
  getGlobalState,
  localStorageItemExist,
  updateItem,
} from "../../../utils/localStorage";

const placeholderColors = [
  "#C7A2DE",
  "#AFDEA2",
  "#DF9368",
  "#DF7868",
  "#A2C1DE",
  "#6888DE",
];
const NotePanel = ({ title, handleOnSubmit, currentNote }) => {
  const { setIsSidebarActive, removeCurrentNote } = useContext(SidebarContext);
  const [noteContents, setNoteContents] = useState({ contents: "", page: 0 });
  const formRef = useRef();
  const globalState = getGlobalState();
  const [prevColors, setPrevColors] = useState({
    prevPickedBg: [],
    prevPickedText: [],
  });

  // should i refactor this? if so please tell me
  function updatePreviousColors(color, context) {
    const maximumColors = 6;
    let removeExtraColor;
    const globalState = getGlobalState();
    if (context == "bg-colors") {
      removeExtraColor = prevColors.prevPickedBg.filter(
        (color, i) => i !== maximumColors
      );
      setPrevColors((prev) => ({
        ...prev,
        prevPickedBg: [color, ...removeExtraColor],
      }));
      localStorage.setItem(
        "globalState",
        JSON.stringify({
          ...globalState,
          note: {
            ...globalState.note,
            prevPickedBg: [color, ...removeExtraColor],
          },
        })
      );
    } else if (context === "text-colors") {
      removeExtraColor = prevColors.prevPickedText.filter(
        (color, i) => i !== maximumColors
      );
      setPrevColors((prev) => ({
        ...prev,
        prevPickedText: [color, ...removeExtraColor],
      }));
      localStorage.setItem(
        "globalState",
        JSON.stringify({
          ...globalState,
          note: {
            ...globalState.note,
            prevPickedText: [color, ...removeExtraColor],
          },
        })
      );
    }
  }

  function checkExistingPreviousColors() {
    if (localStorageItemExist("globalState")) {
      const { note } = getGlobalState();
      if (note.prevPickedBg.length < 6 && note.prevPickedText.length < 6) {
        setPrevColors({
          prevPickedBg: [...placeholderColors],
          prevPickedText: [...placeholderColors],
        });
        return;
      }
      setPrevColors({
        prevPickedBg: [...note.prevPickedBg],
        prevPickedText: [...note.prevPickedText],
      });
    } else {
      const updateGlobalState = {
        note: {
          prevPickedBg: [...placeholderColors],
          prevPickedText: [...placeholderColors],
        },
      };
      setPrevColors({ ...updateGlobalState.note });
      localStorage.setItem("globalState", JSON.stringify(updateGlobalState));
    }
  }

  useEffect(() => {
    checkExistingPreviousColors();
  }, []);

  useEffect(() => {
    title === "Add" && setNoteContents({ contents: "", page: 0 });
  }, [title]);

  useEffect(() => {
    if (currentNote === undefined) return;
    setNoteContents(currentNote);
  }, [currentNote]);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(e, noteContents);
        setIsSidebarActive(false);
      }}
      id="edit-panel"
      className={`${notePanelStyles.container}`}
    >
      <div
        id="contents-container"
        className={`${notePanelStyles.editContainer}`}
      >
        {currentNote !== undefined && (
          <div className={`${notePanelStyles.inputsContainer}`}>
            <label htmlFor="page">Page</label>
            <input
              onChange={(e) => {
                setNoteContents({
                  ...noteContents,
                  page: e.currentTarget.value,
                });
              }}
              className="inputs"
              min={0}
              type="number"
              id="note-page"
              name="page"
              value={noteContents.page}
            />
          </div>
        )}
        <div className={`${notePanelStyles.inputsContainer}`}>
          <label htmlFor="note-contents">{title} Text</label>
          <textarea
            onChange={(e) => {
              setNoteContents({
                ...noteContents,
                contents: e.currentTarget.value,
              });
            }}
            className="inputs"
            type="text"
            id="note-contents"
            name="contents"
            value={noteContents.contents}
          />
        </div>
      </div>
      <div
        id="color-progress-container"
        className={`${notePanelStyles.colorProgressContainer}`}
      >
        <ColorPicker
          updatePreviousColors={updatePreviousColors}
          prevColors={prevColors.prevPickedBg}
          key={"pick-background"}
          name={"bg-colors"}
          currentColor={
            currentNote !== undefined
              ? currentNote.styles.backgroundColor
              : "#DF7868"
          }
          title={"Background"}
        />
        <ColorPicker
          updatePreviousColors={updatePreviousColors}
          prevColors={prevColors.prevPickedText}
          key={"pick-text"}
          name={"text-colors"}
          currentColor={
            currentNote !== undefined
              ? currentNote.styles.textStyles.fill
              : "#1a1b1d"
          }
          title={"Text"}
        />
      </div>
      <PanelBtn
        buttonText={`${title} Note`}
        handleOnCancel={setIsSidebarActive}
        handleOnRemove={removeCurrentNote}
      />
    </form>
  );
};

export default NotePanel;
