import SidebarStyles from "./sidebar.module.css";
import LibraryPanel from "./library-panel/LibraryPanel";
import EditPanel from "./edit-panel/EditPanel";
import BookPanel from "./book-panel/BookPanel";
import { useContext } from "react";
import { SidebarContext } from "../../routes/app/App";

const Sidebar = () => {
  const { currentPanel, addBook, library } = useContext(SidebarContext);
  const panel = revealSidebar();

  function revealSidebar() {
    if (currentPanel === "library-panel") {
      return <LibraryPanel />;
    } else if (currentPanel === "edit-panel") {
      return <EditPanel />;
    } else if (currentPanel === "add-book-panel") {
      return <BookPanel panelTitle={"Add book"} buttonText={"Add book"} handleButton={addBook} />;
    } else if (currentPanel === "edit-book-panel") {
      return (
        <BookPanel
          panelTitle={"Edit book"}
          buttonText={"Edit book"}
          currentBook={library.filter((book) => `/${book.link}` === window.location.pathname)[0]}
        />
      );
    }
  }
  return (
    <div id="side-bar" className={SidebarStyles.container}>
      {panel}
    </div>
  );
};

export default Sidebar;
