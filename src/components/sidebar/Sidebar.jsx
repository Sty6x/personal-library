import SidebarStyles from "./sidebar.module.css";
import LibraryPanel from "./library-panel/LibraryPanel";
import EditPanel from "./edit-panel/EditPanel";

const Sidebar = ({ currentPanel }) => {
  const panel = revealSidebar();

  function revealSidebar() {
    if (currentPanel === "library-panel") {
      return <LibraryPanel />;
    } else if (currentPanel === "edit-panel") {
      return <EditPanel />;
    }
  }
  return (
    <div id="side-bar" className={SidebarStyles.container}>
      {panel}
    </div>
  );
};

export default Sidebar;
