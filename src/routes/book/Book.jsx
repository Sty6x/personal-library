import { useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import Note from "../../components/book-components/Note";

const Book = () => {
  const bookRef = useRef();

  const { library } = useContext(LibraryContext);
  const [currentBook, setCurrentBook] = useState(() => {
    const [book] = library.filter((book) => `/${book.link}` === window.location.pathname);
    return book;
  });

  function filterCurrentBook(arr) {
    const [book] = arr.filter((book) => `/${book.link}` === window.location.pathname);
    return book;
  }

  const renderNotes = currentBook.notes.map((note) => {
    console.log(note.contents);
    return <Note noteData={note} />;
  });

  useEffect(() => {
    setCurrentBook(() => filterCurrentBook(library));
  }, [window.location.pathname]);

  return (
    <div id="book" ref={bookRef} className={BookStyles.container}>
      <button>Update something</button>
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
