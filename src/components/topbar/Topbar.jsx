import TopbarStyles from "./topbar.module.css";
import "./topbar.global.css";
import SidebarBtns from "./sidebar-buttons/SidebarBtns";
import ZoomBtns from "./zoom-buttons/ZoomBtns";
import CurrentBookTitle from "./current-book-title/CurrentBookTitle";

const Topbar = () => {
  return (
    <nav id="top-bar" className={TopbarStyles.navbar}>
      <SidebarBtns
        disableButtons={window.location.pathname !== "/start" ? false : true}
      />
      {window.location.pathname !== "/start" && <CurrentBookTitle />}

      <ZoomBtns />
    </nav>
  );
};

export default Topbar;
