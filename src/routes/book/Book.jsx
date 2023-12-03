import { useContext, useRef } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import Note from "../../components/book-components/Note";
import filterArrItems from "../../utils/filterArray";
import PopupContainer from "../../components/popup-ui/PopupContainer";
import PopupItem from "../../components/popup-ui/popup-item/PopupItem";
import { uid } from "uid";

// needs to update but is delayed
const Book = () => {
  const bookRef = useRef();
  const { library, setLibrary, openEditNotePanelOnClick, popupItems } =
    useContext(LibraryContext);
  const [currentBook] = library.filter(
    (book) => `/${book.link}` === window.location.pathname
  );

  function updateCurrentNotePosition(selectedNote) {
    const currentNote = filterArrItems(
      currentBook.notes,
      (note) => note.id === selectedNote.name
    );
    if (
      selectedNote.x !== currentNote.position.x &&
      selectedNote.y !== currentNote.y
    ) {
      const updateNotes = {
        ...currentNote,
        position: {
          x: selectedNote.x,
          y: selectedNote.y,
        },
      };
      const mappedNotes = currentBook.notes.map((note) => {
        if (note.id === currentNote.id) {
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
      return;
    }
    console.log("dont update");
  }

  const mapPopupItems = popupItems.map(({ text, action }, i) => {
    return <PopupItem key={uid(6)} text={text} action={action} />;
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

  return (
    <div id="book" ref={bookRef} className={BookStyles.container}>
      {popupItems.length > 0 && (
        <PopupContainer>{mapPopupItems}</PopupContainer>
      )}
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
