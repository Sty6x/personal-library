import { useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import Note from "../../components/book-components/Note";
import filterArrItems from "../../utils/filterArray";

// needs to update but is delayed
const Book = () => {
  const bookRef = useRef();
  const { library, setLibrary } = useContext(LibraryContext);
  const [currentBook] = library.filter((book) => `/${book.link}` === window.location.pathname);

  function updateCurrentNotePosition(selectedNote) {
    let isChanged = false;
    const currentNote = filterArrItems(currentBook.notes, (note) => note.id === selectedNote.name);
    const updateNotes = {
      ...currentNote,
      position: {
        x: selectedNote.position.x,
        y: selectedNote.position.y,
      },
    };
    const mappedNotes = currentBook.notes.map((note) => {
      if (note.id === currentNote.id) {
        if (
          note.position.x !== currentNote.position.x &&
          note.position.x !== currentNote.position.y
        ) {
          isChanged = true;
          return updateNotes;
        }
      }
      return note;
    });

    if (isChanged) {
      setLibrary((prev) =>
        prev.map((book) => {
          if (book.link === currentBook.link) {
            return { ...currentBook, notes: mappedNotes };
          }
          return book;
        }),
      );
    }
  }

  useEffect(() => {
    // library is rerendering when mouse leaves the container and note position is the same
    // check if book pos is the same as previous before updating
    console.log(currentBook);
  }, [library]);

  const renderNotes = currentBook.notes.map((note) => {
    return <Note handleUpdateCurrentPosition={updateCurrentNotePosition} noteData={note} />;
  });

  return (
    <div id="book" ref={bookRef} className={BookStyles.container}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0x1a1b1d, antialias: true }}
      >
        {renderNotes}
      </Stage>
    </div>
  );
};

export default Book;
