import BookStyles from "./book.module.css";
const Book = () => {
  return (
    <div id="book" className={BookStyles.container}>
      {/* <h1>This is a book</h1> */}
      <canvas id="canvas">
        <p>Nothing here</p>
      </canvas>
    </div>
  );
};

export default Book;
