import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

const Arrows = () => {
  const fontSize = 16;
  const fill = "#5e6269";
  function drawBezierArrow(g, point0, controlPoint, point1) {
    g.clear();
    g.lineStyle(2, fill, 1);
    let x0;
    let y0;
    let x1;
    let y1;
    let x;
    let y;
    g.moveTo(point0.x, point0.y);
    for (let t = 0; t <= 1.0001; t += 0.02) {
      x0 = point0.x + (controlPoint.x - point0.x) * t;
      y0 = point0.y + (controlPoint.y - point0.y) * t;

      x1 = controlPoint.x + (point1.x - controlPoint.x) * t;
      y1 = controlPoint.y + (point1.y - controlPoint.y) * t;

      x = x0 + (x1 - x0) * t;
      y = y0 + (y1 - y0) * t;

      g.lineTo(x, y);
    }
  }

  const drawLeftArrow = (g) => {
    let t = 0.1;
    const point0 = {
      x: 80,
      y: 70,
    };

    const controlPoint = {
      x: 80,
      y: 245,
    };

    const point1 = {
      x: 200,
      y: 245,
    };
    drawBezierArrow(g, point0, controlPoint, point1);
  };

  const drawRighttArrow = (g) => {
    let t = 0.1;
    const point0 = {
      x: innerWidth - 80,
      y: 70,
    };

    const controlPoint = {
      x: innerWidth - 80,
      y: 200,
    };

    const point1 = {
      x: innerWidth - 200,
      y: 200,
    };

    drawBezierArrow(g, point0, controlPoint, point1);
  };

  return (
    <Container x={0} height={0}>
      <Container>
        <Text
          position={{ x: 210, y: 235 }}
          text="Your books, book edit and note edit..."
          style={
            new PIXI.TextStyle({
              fill,
              wordWrapWidth: 400,
              fontSize,
              fontFamily: "poppins",
            })
          }
        />
        <Graphics draw={drawLeftArrow} />
      </Container>

      <Container x={innerWidth * 0.5} y={innerHeight * 0.5}>
        <Text
          anchor={0.5}
          y={-50}
          text="Personal Library"
          style={
            new PIXI.TextStyle({
              fill: "#DF7868",
              fontSize: 45,
              fontWeight: 600,
              fontFamily: "poppins",
            })
          }
        />

        <Text
          anchor={0.5}
          y={0}
          text="*your data is saved locally on your browser*"
          style={
            new PIXI.TextStyle({
              fill,
              fontSize: 20,
              fontWeight: 400,
              fontFamily: "poppins",
            })
          }
        />
      </Container>
      <Container>
        <Text
          position={{ x: innerWidth - 360, y: 190 }}
          text="*Work in progress*"
          style={
            new PIXI.TextStyle({
              fill,
              wordWrapWidth: 400,
              fontSize,
              fontFamily: "poppins",
            })
          }
        />
        <Graphics draw={drawRighttArrow} />
      </Container>
    </Container>
  );
};
export default Arrows;
