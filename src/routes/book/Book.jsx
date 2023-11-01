import { useContext, useEffect, useRef, useState } from "react";
import BookStyles from "./book.module.css";
import { fabric } from "fabric";
import useCanvas from "../../utils/hooks/useCanvas";
import { LibraryContext } from "../app/App";
const Book = () => {
  const { library } = useContext(LibraryContext);
  const [currentBook, setCurrentBook] = useState(() => {
    const [book] = library.filter((book) => `/${book.link}` === window.location.pathname);
    return book;
  });

  const canvas = useCanvas("canvas");
  const canvasRef = useRef();

  const rect = new fabric.Rect({
    top: 100,
    left: 100,
    fill: "white",
    width: 100,
    height: 100,
  });

  async function drawCanvas() {
    try {
      canvas.add(rect);
    } catch (err) {
      console.log("init");
    }
  }

  function filterCurrentBook(arr) {
    const [book] = arr.filter((book) => `/${book.link}` === window.location.pathname);
    return book;
  }

  useEffect(() => {
    setCurrentBook(() => filterCurrentBook(library));
    console.log(currentBook);
  }, [window.location.pathname]);

  useEffect(() => {
    drawCanvas();
  }, [canvas]);

  return (
    <div id="book" className={BookStyles.container}>
      <button
        onClick={() => {
          var circle = new fabric.Circle({
            radius: 20,
            fill: "green",
            left: 100,
            top: 100,
          });
          canvas.add(circle);
          canvas.renderAll();
        }}
      >
        Click
      </button>
      <canvas
        width={1280}
        height={720}
        ref={canvasRef}
        id="canvas"
        className={`${BookStyles.canvas}`}
      />
      {/* <p>Nothing her</p */}
    </div>
  );
};

export default Book;
