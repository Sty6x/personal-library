import { useContext, useEffect, useRef, useState } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
const Book = () => {
  const { library } = useContext(LibraryContext);
  const [currentBook, setCurrentBook] = useState(() => {
    const [book] = library.filter((book) => `/${book.link}` === window.location.pathname);
    return book;
  });

  const canvasRef = useRef();

  function filterCurrentBook(arr) {
    const [book] = arr.filter((book) => `/${book.link}` === window.location.pathname);
    return book;
  }

  useEffect(() => {
    setCurrentBook(() => filterCurrentBook(library));
  }, [window.location.pathname]);

  return (
    <div id="book" className={BookStyles.container}>
      <button onClick={() => {}}>Click</button>
      <canvas
        width={1920}
        height={1080}
        ref={canvasRef}
        id="canvas"
        className={`${BookStyles.canvas}`}
      />
    </div>
  );
};

export default Book;
