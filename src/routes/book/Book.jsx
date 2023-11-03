import { useContext, useEffect, useRef, useState } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

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

  useEffect(() => {
    setCurrentBook(() => filterCurrentBook(library));
  }, [window.location.pathname]);

  return (
    <div id="book" ref={bookRef} className={BookStyles.container}>
      <Stage>
        <Container x={400} y={330}>
          <Text
            eventMode="static"
            onclick={(e) => {
              console.log("clicked");
            }}
            text="Hello World"
            anchor={{ x: 0.5, y: 0.5 }}
            style={new PIXI.TextStyle({ fill: ["#ffffff", "#00ff99"] })}
          />
        </Container>
      </Stage>
    </div>
  );
};

export default Book;
