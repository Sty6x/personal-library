import { Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
const MenuText = ({ draw, textFill, fontSize, fontFamily }) => {
  return (
    <Container>
      <Text
        position={{ x: 210, y: 235 }}
        text="Your books, book edit and note edit..."
        style={
          new PIXI.TextStyle({
            fill: textFill,
            wordWrapWidth: 400,
            fontSize,
            fontFamily,
          })
        }
      />
      <Graphics draw={draw} />
    </Container>
  );
};

export default MenuText;
