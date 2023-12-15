import { Container, Stage } from "@pixi/react";
import EmptyLibrary from "../components/book-components/fallback-book-contents/EmptyLibrary";
const StartingScreen = () => {
  return (
    <div
      id="book"
      style={{ minWidth: "100%", minHeight: "100%", position: "relative" }}
    >
      <Stage
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0x1a1b1d, antialias: true }}
      >
        <Container sortableChildren={true}>
          <EmptyLibrary />
        </Container>
      </Stage>
    </div>
  );
};

export default StartingScreen;
