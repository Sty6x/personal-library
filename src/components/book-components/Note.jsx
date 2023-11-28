import { Text, Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useCallback } from "react";

const Note = ({}) => {
  let noteIsClicked = false;

  function handleOnMouseDrag(pe) {
    if (!noteIsClicked) {
      return;
    }
    let distanceX = pe.movementX;
    let distanceY = pe.movementY;

    pe.currentTarget.x += distanceX;
    pe.currentTarget.y += distanceY;
  }

  function initMouseClicked(pe) {
    console.log(pe.currentTarget);
    noteIsClicked = noteIsClicked ? false : true;
  }

  const draw = useCallback((g) => {
    g.beginFill(0x68a5de);
    g.drawRoundedRect(0, 0, 450, 300, 6);
  }, []);
  return (
    <Container
      eventMode="static"
      onmousemove={handleOnMouseDrag}
      onmousedown={initMouseClicked}
      onmouseup={initMouseClicked}
      onmouseleave={() => {
        noteIsClicked = false;
      }}
      x={300}
      y={300}
    >
      <Graphics draw={draw} />
      <Text
        anchor={{ x: 0, y: 0 }}
        position={{ x: 20, y: 10 }}
        text="Word Wrap Width is set to 80px For some reason HEHEHHEAD iawdjamoiwd wdiadj"
        style={new PIXI.TextStyle({ fill: "#1a1b1d", wordWrapWidth: 400 - 30, wordWrap: true })}
      />
    </Container>
  );
};
export default Note;
