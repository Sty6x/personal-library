import * as PIXI from "pixi.js";

class Note {
  constructor({ color, position, contents, currentPage }) {
    this.color = color;
    this.position = { ...position };
    this.contents = contents;
    this.currentPage = currentPage;
  }

  draw() {}
}
