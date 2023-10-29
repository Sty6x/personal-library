import TopbarStyles from "./topbar.module.css";
import "./topbar.global.css";
import SidebarBtns from "./sidebar-buttons/SidebarBtns";
import CenterNav from "./center-nav/CenterNav";
import ZoomBtns from "./zoom-buttons/ZoomBtns";

const Topbar = () => {
  return (
    <nav id="top-bar" className={TopbarStyles.navbar}>
      <SidebarBtns />
      <CenterNav />
      <ZoomBtns />
    </nav>
  );
};

export default Topbar;
