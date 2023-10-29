import centerNavStyles from "./centerNav.module.css";

const CenterNav = () => {
  return (
    <div id="center-nav" className={`actionContainers ${centerNavStyles.container}`}>
      <span id="book-center-title">Moby Dick by Herman Melville</span>
      <div id="book-center-props" className={`${centerNavStyles.bookProps}`}>
        <span>
          <p>359</p>
        </span>
        <span>
          <p>359</p>
        </span>
        <span>
          <p>359</p>
        </span>
      </div>
    </div>
  );
};
export default CenterNav;
