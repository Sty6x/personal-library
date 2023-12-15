import { Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
const ZoomText = ({ draw, textFill, fontSize }) => {
  return (
    <Container>
      <Text
        position={{ x: innerWidth - 360, y: 190 }}
        text="*Work in progress*"
        style={
          new PIXI.TextStyle({
            fill: textFill,
            wordWrapWidth: 400,
            fontSize,
            fontFamily: "poppins",
          })
        }
      />
      <Graphics draw={draw} />
    </Container>
  );
};

export default ZoomText;
