import { useContext, useEffect, useRef, useState } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import Note from "../../components/book-components/Note";
import filterArrItems from "../../utils/filterArray";
import { updateItem } from "../../utils/localStorage";
import { getFontFamilyName } from "pixi.js";
import poppins from "../../assets/fonts/poppins-regular-webfont.woff2";
import EmptyLibrary from "../../components/book-components/fallback-book-contents/EmptyLibrary";

// needs to update but is delayed
const Book = () => {
  const { library, setLibrary, openEditNotePanelOnClick, currentBook } =
    useContext(LibraryContext);

  const [openedBook, setOpenedBook] = useState(currentBook);

  useEffect(() => {
    setOpenedBook({ ...currentBook });
    updateItem(currentBook);
  }, [currentBook]);

  useEffect(() => {
    getFontFamilyName(poppins);
  }, []);
  function updateCurrentNotePosition(selectedNote) {
    const currentNote = filterArrItems(
      currentBook.notes,
      (note) => note.id === selectedNote.name
    );
    if (
      selectedNote.x !== currentNote.position.x &&
      selectedNote.y !== currentNote.position.y
    ) {
      const mappedNotes = currentBook.notes.map((note) => {
        if (note.id !== currentNote.id) return note;
        return {
          ...note,
          zIndex: selectedNote.zIndex,
          position: {
            x: selectedNote.x,
            y: selectedNote.y,
          },
        };
      });

      setLibrary((prev) =>
        prev.map((book) => {
          if (book.id === currentBook.id) {
            return { ...currentBook, notes: mappedNotes };
          }
          return book;
        })
      );
      // updating openedbook so that the openedBook state does not have to rely
      // on the currentBook to wait for the new state update of library when
      // updating the position of the note.
      setOpenedBook((prev) => ({ ...prev, notes: mappedNotes }));
      return;
    }
  }

  function updateNoteScale(container) {
    // update width height position{x,y}
    const mappedNotes = currentBook.notes.map((note) => {
      if (note.id !== container.name) return note;
      console.log(note);
      return {
        ...note,
        width: container.width,
        height: container.height,
        position: {
          x: container.x,
          y: container.y,
        },
      };
    });
    setLibrary((prev) =>
      prev.map((book) => {
        if (book.id === currentBook.id) {
          return { ...currentBook, notes: mappedNotes };
        }
        return book;
      })
    );

    setOpenedBook((prev) => ({ ...prev, notes: mappedNotes }));
  }

  const renderNotes = openedBook.notes.map((note) => {
    return (
      <Note
        key={note.id}
        handleEditPanelOnSelect={openEditNotePanelOnClick}
        handleUpdateCurrentPosition={updateCurrentNotePosition}
        handleUpdateNoteScale={updateNoteScale}
        noteData={note}
      />
    );
  });

  return (
    <div id="book" className={BookStyles.container}>
      <Stage
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0x1a1b1d, antialias: true }}
      >
        <Container sortableChildren={true}>
          {openedBook.notes.length === 0 ? <EmptyLibrary /> : renderNotes}
        </Container>
      </Stage>
    </div>
  );
};

export default Book;
