import { useEffect, useRef, useState } from "react";
import BookStyles from "./book.module.css";
import { fabric } from "fabric";
import useCanvas from "../../utils/hooks/useCanvas";
const Book = () => {
  const canvas = useCanvas("canvas");

  const rect = new fabric.Rect({
    top: 50,
    left: 100,
    fill: "white",
    width: 20,
    height: 20,
  });

  async function drawCanvas() {
    canvas.add(rect);
  }

  useEffect(() => {
    if (canvas !== undefined) {
      console.log(canvas);
      drawCanvas();
    }
  }, [canvas]);

  return (
    <div id="book" className={BookStyles.container}>
      <canvas id="canvas" className={`${BookStyles.canvas}`} />
      {/* <p>Nothing here</p> */}
    </div>
  );
};

export default Book;
