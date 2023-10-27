import TopbarStyles from "./topbar.module.css";

const Topbar = () => {
  return (
    <nav id="top-bar" className={TopbarStyles.navbar}>
      <div id="left-nav" className={`topbar-actions`}>
        <span id="sidebar-btns" className={`${TopbarStyles.actionContainers}`}>
          <button id="sidebar">Side</button>
          <button id="edit-panel">Edit</button>
        </span>
        <button id="add-book">Add</button>
      </div>
      <div id="center-nav" className={`${TopbarStyles.actionContainers} topbar-actions`}>
        <span id="book-center-title">Moby Dick by Herman Melville</span>
        <div id="book-center-props" className={`${TopbarStyles.bookProps}`}>
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
      <div id="right-nav" className={`${TopbarStyles.actionContainers} topbar-actions`}>
        <button>-</button>
        <p>100%</p>
        <button>+</button>
      </div>
    </nav>
  );
};

export default Topbar;
