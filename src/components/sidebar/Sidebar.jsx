import SidebarStyles from "./sidebar.module.css";
import LibraryPanel from "./library-panel/LibraryPanel";

const Sidebar = ({ isActive }) => {
  return (
    <div id="side-bar" className={SidebarStyles.container}>
      <LibraryPanel />
    </div>
  );
};

export default Sidebar;
