import { useEffect, useRef, useState } from "react";
import BookStyles from "./book.module.css";
import { fabric } from "fabric";
import useCanvas from "../../utils/hooks/useCanvas";
const Book = () => {
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
    canvas.add(rect);
  }

  function setCanvasDrawingBuffer(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
      // Make the canvas the same size
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    return needResize;
  }

  useEffect(() => {
    console.log(setCanvasDrawingBuffer(canvasRef.current));
  }, []);

  useEffect(() => {
    if (canvas !== undefined) {
      console.log(canvas);
      drawCanvas();
    }
  }, [canvas]);

  return (
    <div id="book" className={BookStyles.container}>
      <canvas ref={canvasRef} id="canvas" className={`${BookStyles.canvas}`} />
      {/* <p>Nothing here</p */}
    </div>
  );
};

export default Book;
