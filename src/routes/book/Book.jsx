import { useContext, useEffect, useRef, useState } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import Note from "../../components/book-components/Note";
import filterArrItems from "../../utils/filterArray";
import PopupContainer from "../../components/popup-ui/PopupContainer";
import PopupItem from "../../components/popup-ui/popup-item/PopupItem";
import { uid } from "uid";
import { useParams } from "react-router-dom";

// needs to update but is delayed
const Book = () => {
  const bookRef = useRef();
  const { bookId } = useParams();
  const {
    library,
    setLibrary,
    openEditNotePanelOnClick,
    popupItems,
    currentBook,
    setCurrentBook,
  } = useContext(LibraryContext);

  const [openedBook, setOpenedBook] = useState(currentBook);

  // only update the currentBook or library if the openedBook is updated
  // currentBooks state from app component is used to update the static UI for the book component.
  // the currentBook's state is updated when the windows param is changed.
  // currentBook is passed in to the book as prop.
  // book component has its own state to update UI while the currentBook is used as an initial
  // to render the book.
  // first we update the state of the openedBook to synchronize the book component's UI
  // instead of relying on currentBook that has to wait for the library state to update.
  // (currentBook is updated if library is updated),
  // since book component does not need to update the text in real time, the openedBook can rely on the update
  // of the currentBook state which is updated when the books in the library state is updated (editing note text)

  useEffect(() => {
    console.log(bookId);
    setLibrary((prev) =>
      prev.map((book) => {
        if (book.link === openedBook.link) {
          return openedBook;
        }
        return book;
      })
    );
  }, [openedBook]);

  useEffect(() => {
    setOpenedBook(currentBook);
  }, [currentBook]);

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
        zIndex: selectedNote.zIndex,
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

      setOpenedBook({ ...openedBook, notes: mappedNotes });
      return;
    }
    console.log("dont update");
  }

  const mapPopupItems = popupItems.map(({ text, action }, i) => {
    return <PopupItem key={uid(6)} text={text} action={action} />;
  });

  const renderNotes = openedBook.notes.map((note) => {
    return (
      <Note
        key={note.id}
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
