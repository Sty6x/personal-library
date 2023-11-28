import { useContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
import BookStyles from "./book.module.css";
import { LibraryContext } from "../app/App";
import { Stage, Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

const Book = () => {
  const bookRef = useRef();
  let noteIsClicked = false;

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

  function handleOnMouseDrag(pe) {
    if (!noteIsClicked) {
      return;
    }
    let distanceX = pe.movementX;
    let distanceY = pe.movementY;

    pe.currentTarget.x = pe.currentTarget.x + distanceX;
    pe.currentTarget.y = pe.currentTarget.y + distanceY;
  }

  function initMouseClicked(pe) {
    console.log(pe.currentTarget);
    noteIsClicked = noteIsClicked ? false : true;
  }

  const draw = useCallback((g) => {
    g.beginFill(0x68a5de);
    g.drawRoundedRect(0, 0, 450, 300, 6);
  }, []);

  return (
    <div id="book" ref={bookRef} className={BookStyles.container}>
      <Stage
        // onMouseMove={handleOnMouseDrag}
        options={{ backgroundColor: 0x1a1b1d, antialias: true }}
      >
        <Container
          eventMode="static"
          onmousemove={handleOnMouseDrag}
          onmousedown={initMouseClicked}
          onmouseup={initMouseClicked}
          onmouseleave={() => {
            noteIsClicked = false;
          }}
          x={300}
          y={300}
        >
          <Graphics draw={draw} />
          <Text
            anchor={{ x: 0, y: 0 }}
            position={{ x: 20, y: 10 }}
            text="Word Wrap Width is set to 80px For some reason HEHEHHEAD iawdjamoiwd wdiadj"
            style={new PIXI.TextStyle({ fill: "#1a1b1d", wordWrapWidth: 400 - 30, wordWrap: true })}
          />
        </Container>
      </Stage>
    </div>
  );
};

export default Book;
