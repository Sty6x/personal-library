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


  async function drawCanvas(note) {
    console.log(note)
    const rect = new fabric.Rect({
      originX: "center",
      originY: "center",
      fill: "#DF7868",
      width: 150,
      height: 100,
    });
    // const text = new fabric.Text(note.contents, {
    //   originX: "center",
    //   originY: "center",
    //   fontSize: 10,
    //   fontFamily: "poppins",
    //   width: 150,
    //   height: 200,
    //   fill: "#1a1b1d"
    // })
    const text = new fabric.Textbox(note.contents, {
      originX: "center",
      originY: "center",
      fontFamily: "poppins",
      width: 200,
      height: 200,
      fill: "pink",
    })

    const group = new fabric.Group([text], {
      left: note.position.x,
      top: note.position.y,
    })

    try {
      canvas.add(text);
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
    currentBook.notes.forEach(note => drawCanvas(note))
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
        width={1920}
        height={1080}
        ref={canvasRef}
        id="canvas"
        className={`${BookStyles.canvas}`}
      />
      {/* <p>Nothing her</p */}
    </div>
  );
};

export default Book;
