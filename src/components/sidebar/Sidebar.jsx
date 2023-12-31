import SidebarStyles from "./sidebar.module.css";
import LibraryPanel from "./library-panel/LibraryPanel";
import BookPanel from "./book-panel/BookPanel";
import { useContext } from "react";
import { SidebarContext } from "../../routes/app/App";
import NotePanel from "./note-panel/NotePanel";
const Sidebar = () => {
  const {
    currentPanel,
    currentBook,
    editBook,
    library,
    addNote,
    editNote,
    currentNote,
  } = useContext(SidebarContext);
  const panel = revealSidebar();

  function revealSidebar() {
    if (currentPanel === "library-panel") {
      return <LibraryPanel />;
    } else if (currentPanel === "add-note-panel") {
      return (
        <NotePanel
          title={"Add"}
          handleOnSubmit={addNote}
          // handleButton={editBook}
        />
      );
    } else if (currentPanel === "edit-note-panel") {
      return (
        <NotePanel
          title={"Edit"}
          handleOnSubmit={editNote}
          currentNote={currentNote}
          // handleButton={editBook}
        />
      );
    } else if (currentPanel === "edit-book-panel") {
      return (
        <BookPanel
          panelTitle={"Edit book"}
          buttonText={"Edit book"}
          handleButton={editBook}
          currentBook={currentBook}
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
