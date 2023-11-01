import { useEffect, useState } from "react";
import { fabric } from "fabric";

const useCanvas = (canvasId) => {
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasId, {
      backgroundColor: "red",
      selectionColor: "blue",
      selectionLineWidth: 2,
    });
    canvas.setWidth("100%", { cssOnly: true });
    canvas.setHeight("100%", { cssOnly: true });
    setCanvas(canvas);
  }, []);

  return canvas;
};

export default useCanvas;
