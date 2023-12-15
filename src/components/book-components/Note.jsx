import { Text, Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";

const Note = ({
  noteData,
  handleUpdateCurrentPosition,
  handleEditPanelOnSelect,
}) => {
  let noteIsClicked = false;

  const [currentNote, setCurrentNote] = useState(noteData);
  const noteTextRef = useRef();
  useEffect(() => {
    const noteText = noteTextRef.current;
    setCurrentNote({
      ...noteData,
      // updates the width and height of the graphics if the noteData updates or is edited
      width: noteText.width < noteData.width ? noteData.width : noteText.width,
      height: noteText.height,
    });
  }, [noteData]);

  function initMouseClicked(pe) {
    pe.stopPropagation();
    const container = pe.currentTarget;

    noteIsClicked = noteIsClicked ? false : true;
    container.zIndex = noteIsClicked ? 999 : 1;
    !noteIsClicked && handleUpdateCurrentPosition(container);
  }

  function handleOnMouseDrag(pe) {
    pe.stopPropagation();
    const container = pe.currentTarget;
    if (!noteIsClicked) return;
    let distanceX = pe.movementX;
    let distanceY = pe.movementY;
    container.x += distanceX;
    container.y += distanceY;
  }

  function noteSelection(pe) {
    const container = pe.currentTarget;
    handleEditPanelOnSelect(container);
  }

  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(currentNote.styles.backgroundColor);
      g.drawRoundedRect(
        0,
        0,
        currentNote.width + 40,
        currentNote.height + 80,
        6
      );
      g.endFill();
    },
    [currentNote]
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
        ref={noteTextRef}
        anchor={{ x: 0, y: 0 }}
        position={{ x: 20, y: 50 }}
        text={noteData.contents}
        style={
          new PIXI.TextStyle({
            ...noteData.styles.textStyles,
            wordWrapWidth: currentNote.width,
            fontSize: 20,
            breakWords: true,
            fontFamily: "poppins",
          })
        }
      />

      <Text
        anchor={{ x: 0, y: 0 }}
        position={{ x: 20, y: 15 }}
        text={`Page: ${noteData.page}`}
        style={
          new PIXI.TextStyle({
            ...noteData.styles.textStyles,
            wordWrapWidth: 400,
            fontWeight: "500",
            fontSize: 22,
            fontFamily: "poppins",
          })
        }
      />
    </Container>
  );
};
export default Note;
