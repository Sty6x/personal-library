import currentBookTitleStyles from "./currentBookTitle.module.css";

const CurrentBookTitle = () => {
  return (
    <div id="center-nav" className={`topbarActionContainers ${currentBookTitleStyles.container}`}>
      <span id="book-center-title">Moby Dick by Herman Melville</span>
      <div id="book-center-props" className={`${currentBookTitleStyles.bookProps}`}>
        <span>
          <p>359</p>
        </span>
        <span>
          <p>251</p>
        </span>
        <span>
          <p>70%</p>
        </span>
      </div>
    </div>
  );
};
export default CurrentBookTitle;
