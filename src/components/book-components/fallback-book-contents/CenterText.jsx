import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
const CenterText = ({ textFill, fontFamily }) => {
  return (
    <Container x={innerWidth * 0.5} y={innerHeight * 0.5}>
      <Text
        anchor={0.5}
        y={-40}
        text="Personal Library"
        style={
          new PIXI.TextStyle({
            fill: "#DF7868",
            fontSize: 45,
            fontWeight: 600,
            fontFamily,
          })
        }
      />

      <Text
        anchor={0.5}
        y={0}
        text="*All your data is saved locally in your browser*"
        style={
          new PIXI.TextStyle({
            fill: textFill,
            fontSize: 17,
            fontWeight: 400,
            fontFamily,
          })
        }
      />
      {/* <Text
        anchor={0.5}
        y={30}
        text="Github"
        style={
          new PIXI.TextStyle({
            wordWrap: true,
            wordWrapWidth: 700,
            align: "center",
            breakWords: true,
            fill: textFill,
            fontSize: 20,
            fontWeight: 400,
            fontFamily: "poppins",
          })
        }
      /> */}
    </Container>
  );
};

export default CenterText;
