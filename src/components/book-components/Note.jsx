import { Text, Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const Note = (
  { noteData, handleUpdateCurrentPosition, handleEditPanelOnSelect },
  ref
) => {
  let noteIsClicked = false;
  let scaleState;

  const [currentNote, setCurrentNote] = useState(noteData);

  useEffect(() => {
    console.log(currentNote.styles);
  }, [currentNote]);

  function initMouseClicked(pe) {
    pe.stopPropagation();
    const container = pe.currentTarget;

    noteIsClicked = noteIsClicked ? false : true;
    container.zIndex = noteIsClicked ? 999 : 1;
    scaleState = noteIsClicked ? getScalingState(pe) : undefined;
    !noteIsClicked && handleUpdateCurrentPosition(container);
  }

  function getScalingState(pe) {
    const container = pe.currentTarget;
    const graphicsComponent = container.children[0];
    const containerBounds = container.getBounds();
    const threshold = 10;
    const rightScale = containerBounds.width - threshold;
    const bottomScale = containerBounds.height - threshold;
    const originScale = 0 + threshold; // 0 for origin of the container

    //  returns the mouse position relative to the note
    const calculateCurrentMousePos = {
      x: Math.floor(pe.clientX - containerBounds.x),
      y: Math.floor(pe.clientY - containerBounds.y),
    };
    if (calculateCurrentMousePos.x >= rightScale) {
      console.log("INIT WIDTH SCALING");
      return "right";
    } else if (calculateCurrentMousePos.x <= originScale) {
      console.log("INIT WIDTH SCALING");
      return "left";
    } else if (calculateCurrentMousePos.y >= bottomScale) {
      console.log("INIT HEIGHT SCALING");
      return "bottom";
    } else if (calculateCurrentMousePos.y <= originScale) {
      console.log("INIT HEIGHT SCALING");
      return "top";
    }
  }

  function handleOnMouseDrag(pe) {
    pe.stopPropagation();
    const container = pe.currentTarget;
    if (!noteIsClicked) return;
    let distanceX = pe.movementX;
    let distanceY = pe.movementY;

    if (scaleState === undefined) {
      (pe.currentTarget.x += distanceX) * 0.8;
      (pe.currentTarget.y += distanceY) * 0.8;
      return;
    }

    const graphics = container.children[0];
    const graphicsBounds = graphics.getBounds();
    console.log(graphics.width);
    const minWidth = 300;
    const minheight = 300;
    if (scaleState === "right") {
      graphics.width += distanceX;
    } else if (scaleState === "bottom") {
      graphics.height += distanceY;
    } else if (scaleState === "left") {
      container.x += distanceX;
      console.log(container.x);

      // containerBounds.right is the position that
      // the container occupies(width) relative to the canvas
      let calculateMissingSpace = graphicsBounds.right - container.x;
      graphics.width = calculateMissingSpace;
    }
  }

  function redrawRectSelection(container) {
    const graphicsComponent = container.children[0];
    graphicsComponent.clear();
    graphicsComponent.beginFill("#ffffff");
    graphicsComponent.drawRect(-12, -12, 474, 324);
    graphicsComponent.endFill();

    graphicsComponent.beginFill("#1a1b1d");
    graphicsComponent.drawRect(-8, -8, 465, 315);
    graphicsComponent.endFill();

    graphicsComponent.beginFill(noteData.styles.backgroundColor);
    graphicsComponent.drawRoundedRect(0, 0, 450, 300, 6);
    graphicsComponent.endFill();
  }
  function noteSelection(pe) {
    const container = pe.currentTarget;
    if (scaleState !== undefined) return;
    handleEditPanelOnSelect(container);
  }

  const draw = useCallback(
    (g) => {
      g.beginFill(noteData.styles.backgroundColor);
      g.drawRoundedRect(0, 0, 450, 300, 6);
      g.endFill();
    },
    [noteData]
  );
  return (
    <Container
      zIndex={noteData.zIndex}
      name={noteData.id}
      eventMode="static"
      onclick={noteSelection}
      onmousemove={handleOnMouseDrag}
      onmousedown={initMouseClicked}
      onmouseup={initMouseClicked}
      onmouseleave={(pe) => {
        noteIsClicked = false;
        handleUpdateCurrentPosition(pe.currentTarget);
      }}
      x={noteData.position.x}
      y={noteData.position.y}
    >
      <Graphics draw={draw} />
      <Text
        anchor={{ x: 0, y: 0 }}
        position={{ x: 20, y: 50 }}
        text={noteData.contents}
        style={new PIXI.TextStyle({ ...noteData.styles.textStyles })}
      />

      <Text
        anchor={{ x: 0, y: 0 }}
        position={{ x: 20, y: 10 }}
        text={`Page:${noteData.page}`}
        style={
          new PIXI.TextStyle({
            ...noteData.styles.textStyles,
            fontWeight: "600",
          })
        }
      />
    </Container>
  );
};
export default Note;
