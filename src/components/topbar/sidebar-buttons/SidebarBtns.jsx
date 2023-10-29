import sidebarBtnStyles from "./sidebarBtns.module.css";

const SidebarBtns = () => {
  return (
    <div id="sidebar-btns-container" className={`topbar-actions ${sidebarBtnStyles.container}`}>
      <span id="sidebar-btns" className={`actionContainers ${sidebarBtnStyles.buttonsContainer}`}>
        <button id="sidebar" className={`${sidebarBtnStyles.libraryBtn}`}>
          librarybtn
        </button>
        <button id="edit-panel" className={`${sidebarBtnStyles.sidebarBtn}`}>
          sidebarbtn
        </button>
      </span>
      <button id="add-book">Add</button>
    </div>
  );
};
export default SidebarBtns;
