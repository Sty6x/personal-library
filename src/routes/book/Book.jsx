import BookStyles from "./book.module.css";
const Book = () => {
  return (
    <div id="book" className={BookStyles.container}>
      <canvas id="canvas" className={`${BookStyles.canvas}`} />
      {/* <p>Nothing here</p> */}
    </div>
  );
};

export default Book;
