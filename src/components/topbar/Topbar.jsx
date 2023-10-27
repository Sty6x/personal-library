import TopbarStyles from "./topbar.module.css";

const Topbar = () => {
  return (
    <nav id="top-bar" className={TopbarStyles.navbar}>
      <div id="left-nav" className={`${TopbarStyles.actionContainers} topbar-actions`}>
        <span id="sidebar">Side</span>
        <span id="add-book">Add</span>
      </div>
      <div id="center-nav" className={`${TopbarStyles.actionContainers} topbar-actions`}>
        <span id="book-center-title">Moby Dick by Herman Melville</span>
        <div id="book-center-props" className={`${TopbarStyles.bookProps}`}>
          <p>359</p>
          <p>200</p>
          <p>65%</p>
        </div>
      </div>
      <div id="right-nav" className={`${TopbarStyles.actionContainers} topbar-actions`}>
        <button>-</button>
        <p>100%</p>
        <button>+</button>
      </div>
    </nav>
  );
};

export default Topbar;
