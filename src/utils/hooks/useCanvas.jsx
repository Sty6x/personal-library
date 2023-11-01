import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const useCanvas = (canvasId) => {
  const canvasFabric = useRef();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasId, {
      backgroundColor: "#1A1B1D",
      selectionColor: "transparent",
      selection: false,
    });
    canvas.setWidth("100%", { cssOnly: true });
    canvas.setHeight("100%", { cssOnly: true });
    canvasFabric.current = canvas;
  }, []);

  return canvasFabric.current;
};

export default useCanvas;
