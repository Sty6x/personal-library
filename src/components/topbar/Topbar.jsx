import TopbarStyles from "./topbar.module.css";
import "./topbar.global.css";
import SidebarBtns from "./sidebar-buttons/SidebarBtns";
import ZoomBtns from "./zoom-buttons/ZoomBtns";
import CurrentBookTitle from "./current-book-title/CurrentBookTitle";

const Topbar = () => {
  return (
    <nav id="top-bar" className={TopbarStyles.navbar}>
      <SidebarBtns />
      {window.location.pathname !== "/" && <CurrentBookTitle />}

      <ZoomBtns />
    </nav>
  );
};

export default Topbar;
