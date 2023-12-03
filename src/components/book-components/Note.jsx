import { Text, Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { forwardRef, useCallback, useContext } from "react";

const Note = (
  { noteData, handleUpdateCurrentPosition, handleEditPanelOnSelect },
  ref
) => {
  let noteIsClicked = false;

  function initMouseClicked(pe) {
    pe.stopPropagation();
    const container = pe.currentTarget;
    noteIsClicked = noteIsClicked ? false : true;
    container.zIndex = 999;
    !noteIsClicked && handleUpdateCurrentPosition(container);
  }
  function handleOnMouseDrag(pe) {
    pe.stopPropagation();
    if (!noteIsClicked) {
      return;
    }
    let distanceX = pe.movementX;
    let distanceY = pe.movementY;

    (pe.currentTarget.x += distanceX) * 0.8;
    (pe.currentTarget.y += distanceY) * 0.8;
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
    console.log("clicked");
    const container = pe.currentTarget;
    redrawRectSelection(container);
    handleEditPanelOnSelect(pe);
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
