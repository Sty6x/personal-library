import { useContext, useEffect, useRef, useState, useCallback } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

const Book = () => {
  const bookRef = useRef();
  // const { library } = useContext(LibraryContext);
  // const [currentBook, setCurrentBook] = useState(() => {
  //   const [book] = library.filter((book) => `/${book.link}` === window.location.pathname);
  //   return book;
  // });

  // function filterCurrentBook(arr) {
  //   const [book] = arr.filter((book) => `/${book.link}` === window.location.pathname);
  //   return book;
  // }

  // useEffect(() => {
  //   setCurrentBook(() => filterCurrentBook(library));
  // }, [window.location.pathname]);
  //
  const draw = useCallback((g) => {
    g.beginFill(0x68a5de);
    g.drawRoundedRect(0, 0, 450, 300, 6);

    // g.drawRect(0, 0, 100, 100);
  }, []);

  return (
    <div id="book" ref={bookRef} className={BookStyles.container}>
      <Stage options={{ backgroundColor: 0x1a1b1d, antialias: true }}>
        <Container x={300} y={300}>
          <Graphics draw={draw} />
          <Text
            anchor={{ x: 0, y: 0 }}
            position={{ x: 20, y: 10 }}
            eventMode="static"
            onclick={(e) => {
              console.log("clicked");
            }}
            text="Word Wrap Width is set to 80px For some reason HEHEHHEAD iawdjamoiwd wdiadj"
            style={new PIXI.TextStyle({ fill: "#1a1b1d", wordWrapWidth: 400 - 30, wordWrap: true })}
          />
        </Container>
      </Stage>
    </div>
  );
};

export default Book;
