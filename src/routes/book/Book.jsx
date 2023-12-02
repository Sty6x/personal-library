import {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import Note from "../../components/book-components/Note";
import filterArrItems from "../../utils/filterArray";
import PopupContainer from "../../components/popup-ui/PopupContainer";
import PopupItem from "../../components/popup-ui/popup-item/PopupItem";

// needs to update but is delayed
const Book = () => {
  const bookRef = useRef();
  const { library, setLibrary, openEditNotePanelOnClick } =
    useContext(LibraryContext);
  const [currentBook] = library.filter(
    (book) => `/${book.link}` === window.location.pathname
  );

  const popupTexts = [
    { text: "New Book added", action: "add" },
    { text: "Book deleted", action: "delete" },
    { text: "Note deleted", action: "delete" },
    { text: "New Note added", action: "add" },
    { text: "Note updated", action: "update" },
  ];
  const [popup, setPopup] = useState([]);

  function updateCurrentNotePosition(selectedNote) {
    let isChanged = false;
    const currentNote = filterArrItems(
      currentBook.notes,
      (note) => note.id === selectedNote.name
    );
    const updateNotes = {
      ...currentNote,
      position: {
        x: selectedNote.position.x,
        y: selectedNote.position.y,
      },
    };
    const mappedNotes = currentBook.notes.map((note) => {
      if (note.id === currentNote.id) {
        isChanged = true;
        return updateNotes;
      }
      return note;
    });

    setLibrary((prev) =>
      prev.map((book) => {
        if (book.link === currentBook.link) {
          return { ...currentBook, notes: mappedNotes };
        }
        return book;
      })
    );
  }

  const mapPopupItems = popup.map(({ text, action }, i) => {
    return (
      <PopupItem setterArr={setPopup} text={text} action={action} index={i} />
    );
  });

  const renderNotes = currentBook.notes.map((note) => {
    return (
      <Note
        handleEditPanelOnSelect={openEditNotePanelOnClick}
        handleUpdateCurrentPosition={updateCurrentNotePosition}
        noteData={note}
      />
    );
  });

  function addPopUp() {
    const rng = Math.floor(Math.random() * popupTexts.length);
    setPopup([popupTexts[rng], ...popup]);
  }

  function removePopup() {
    setTimeout(() => {
      setPopup((prev) => prev.filter((item, i) => i === popup.length));
    }, 1500);
  }

  useEffect(() => {
    if (popup.length > 0 && popup.length < 2) {
      removePopup();
    }
  }, [popup]);

  return (
    <div id="book" ref={bookRef} className={BookStyles.container}>
      <button type="button" onClick={addPopUp}>
        Add Popup
      </button>
      {popup.length > 0 && <PopupContainer>{mapPopupItems}</PopupContainer>}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0x1a1b1d, antialias: true }}
      >
        <Container sortableChildren={true}>{renderNotes}</Container>
      </Stage>
    </div>
  );
};

export default Book;
