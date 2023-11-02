import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const useCanvas = (canvasId) => {
  const canvasFabric = useRef();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasId, {
      backgroundColor: "#1A1B1D",
      selectionColor: "transparent",
      selection: true,
    });
    canvas.setWidth("100%", { cssOnly: true });
    canvas.setHeight("100%", { cssOnly: true });
    canvasFabric.current = canvas;
    setIsReady(true);
  }, []);

  return isReady && canvasFabric.current;
};

export default useCanvas;
