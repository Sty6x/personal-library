import SidebarStyles from "./sidebar.module.css";
import LibraryPanel from "./library-panel/LibraryPanel";

const Sidebar = ({ currentPanel }) => {
  const panel = revealSidebar();

  function revealSidebar() {
    if (currentPanel === "library-panel") {
      return <LibraryPanel />;
    } else if (currentPanel === "edit-panel") {
      return <p style={{ color: "white" }}>This is an edit panel</p>;
    }
  }
  return (
    <div id="side-bar" className={SidebarStyles.container}>
      {panel}
    </div>
  );
};

export default Sidebar;
