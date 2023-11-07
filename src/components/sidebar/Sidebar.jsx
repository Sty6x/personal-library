import SidebarStyles from "./sidebar.module.css";
import LibraryPanel from "./library-panel/LibraryPanel";
import BookPanel from "./book-panel/BookPanel";
import { useContext } from "react";
import { SidebarContext } from "../../routes/app/App";
import NotePanel from "./note-panel/NotePanel";
const Sidebar = () => {
  const { currentPanel, editBook, library } = useContext(SidebarContext);
  const panel = revealSidebar();

  function revealSidebar() {
    if (currentPanel === "library-panel") {
      return <LibraryPanel />;
    } else if (currentPanel === "note-panel") {
      return (
        <NotePanel
          title={"Add Note"}
          panelTitle={"Edit book"}
          buttonText={"Edit book"}
          // handleButton={editBook}
        />
      );
    } else if (currentPanel === "edit-book-panel") {
      return (
        <BookPanel
          panelTitle={"Edit book"}
          buttonText={"Edit book"}
          handleButton={editBook}
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
