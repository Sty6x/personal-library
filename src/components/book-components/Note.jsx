import { Text, Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { forwardRef, useCallback, useContext } from "react";

const Note = ({ noteData, handleUpdateCurrentPosition }, ref) => {
  let noteIsClicked = false;

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

  function initMouseClicked(pe) {
    noteIsClicked = noteIsClicked ? false : true;
    !noteIsClicked && handleUpdateCurrentPosition(pe.currentTarget);
  }

  function noteSelection(pe) {
    const container = pe.currentTarget;
    const graphicsComponent = container.children[0];
    graphicsComponent.clear();
    graphicsComponent.beginFill("#DF786850");
    graphicsComponent.drawRect(-10, -10, 470, 320);
    graphicsComponent.endFill();

    graphicsComponent.beginFill(noteData.styles.backgroundColor);
    graphicsComponent.drawRoundedRect(0, 0, 450, 300, 6);
    graphicsComponent.endFill();
    console.log(graphicsComponent);
  }
  const draw = useCallback((g) => {
    g.beginFill(noteData.styles.backgroundColor);
    g.drawRoundedRect(0, 0, 450, 300, 6);
    g.endFill();
  }, []);
  return (
    <Container
      name={noteData.id}
      eventMode="static"
      // onclick={noteSelection}
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
        position={{ x: 20, y: 10 }}
        text={noteData.contents}
        style={new PIXI.TextStyle(noteData.styles.textStyles)}
      />
    </Container>
  );
};
export default Note;
