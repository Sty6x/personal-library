import { Text, Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { forwardRef, useCallback, useContext } from "react";

const Note = ({ noteData, handleUpdateCurrentPosition }, ref) => {
  let noteIsClicked = false;

  function handleOnMouseDrag(pe) {
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

  const draw = useCallback((g) => {
    g.beginFill(noteData.styles.backgroundColor);
    g.drawRoundedRect(0, 0, 450, 300, 6);
  }, []);
  return (
    <Container
      name={noteData.id}
      eventMode="static"
      onclick={(pe) => {
        console.log(pe.currentTarget);
      }}
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
