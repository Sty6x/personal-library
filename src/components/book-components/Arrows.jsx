import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

const Arrows = () => {
  const drawLeftArrow = (g) => {
    let t = 0.1;
    const point0 = {
      x: 80,
      y: 80,
    };

    const controlPoint = {
      x: 100,
      y: 280,
    };

    const point1 = {
      x: 200,
      y: 270,
    };

    g.clear();
    // control points
    g.lineStyle(2, "#DF7868", 1);
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

    g.clear();
    // control points
    g.lineStyle(2, "#DF7868", 1);
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
  };

  return (
    <Container x={0} height={0}>
      <Container>
        <Text
          position={{ x: 210, y: 260 }}
          text="Your books, book edit and note edit..."
          style={
            new PIXI.TextStyle({
              fill: "#ffffff30",
              wordWrapWidth: 400,
              fontSize: 19,
              fontFamily: "poppins",
            })
          }
        />
        <Graphics draw={drawLeftArrow} />
      </Container>

      <Container>
        <Text
          position={{ x: innerWidth - 385, y: 190 }}
          text="*Work in progress*"
          style={
            new PIXI.TextStyle({
              fill: "#ffffff30",
              wordWrapWidth: 400,
              fontSize: 19,
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
