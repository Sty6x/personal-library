import { uid } from "uid";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";
import { placeholders } from "../../utils/placeholderLibrary.js";
import filterArrItems from "../../utils/filterArray.js";
import DialogBox from "../../components/book-components/dialog-box/DialogBox.jsx";
import usePrevState from "../../utils/hooks/usePrevState.jsx";

export const TopBarContext = createContext();
export const LibraryContext = createContext();
export const SidebarContext = createContext();

// what updates the app?
// adding, editing, deleting, selecting a note, sidebar activities
// outlets (book routes) are not supposed to update when sidebar states are changed.
// mouse hovering over notes rerenders the app

function App() {
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [sidebarBtn, setSidebarBtn] = useState("library-panel");
  const [library, setLibrary] = useState([...placeholders]);
  const [selectedNote, setSelectedNote] = useState(undefined);
  const prevState = usePrevState(library.length);
  const [popupItems, setPopupItems] = useState([]);
  const [currentBook, setCurrentBook] = useState(
    library.filter((book) => `/${book.id}` === window.location.pathname)[0]
  );
  const dialogRef = useRef();

  function queryCurrentBook() {
    const [currentBook] = library.filter(
      (book) => `/${book.id}` === window.location.pathname
    );
    const currentLibraryState = library.filter(
      (book) => `/${book.id}` !== window.location.pathname
    );
    return [currentBook, currentLibraryState];
  }

  function editBook(contents) {
    const [currentBook, currentLibraryState] = queryCurrentBook();
    const updatedBook = {
      ...currentBook,
      title: contents.title,
      author: contents.author,
      totalPages: Number(contents.totalPages),
      currentPage: Number(contents.currentPage),
      genre: [...contents.genre],
      lastUpdated: new Date(),
    };
    setLibrary([updatedBook, ...currentLibraryState]);
    addPopupItems("Book Updated!", "update");
  }

  function addBook() {
    const bookTime = new Date();
    const newBook = {
      title: "",
      author: "",
      genre: [],
      notes: [],
      totalPages: 0,
      currentPage: 0,
      id: uid(16),
      isFinished: false,
      dateCreated: bookTime,
      lastUpdated: bookTime,
    };
    setLibrary((prev) => [newBook, ...prev]);
    addPopupItems("Added New Book!", "add");
  }

  // selecting a note means that it needs to set all of the other notes' zIndex to 0
  function openEditNotePanelOnClick(clickedNote) {
    const [currentBook] = queryCurrentBook();
    const noteText = clickedNote.children[1];
    setSidebarBtn("edit-note-panel");
    setIsSidebarActive(true);
    const currentNote = filterArrItems(
      currentBook.notes,
      (note) => note.id.toString().localeCompare(clickedNote.name) === 0
    );
    setSelectedNote({ ...currentNote });
  }

  function editNote(e, noteData) {
    const target = e.currentTarget;
    const formData = new FormData(target);
    const updatedNoteDataInputs = Object.fromEntries(formData.entries());
    const [currentBook] = queryCurrentBook();
    setLibrary((prev) =>
      prev.map((book) => {
        if (book.id !== currentBook.id) return book;
        const updateNotes = currentBook.notes.map((note) => {
          if (note.id !== selectedNote.id) return note;
          return {
            ...note,
            contents: noteData.contents,
            page: noteData.page,
            zIndex: 999,
            styles: {
              ...note.styles,
              backgroundColor: updatedNoteDataInputs.pickedColorBackground,
              textStyles: {
                ...note.styles.textStyles,
                fill: updatedNoteDataInputs.pickedColorText,
              },
            },
          };
        });
        return { ...currentBook, notes: [...updateNotes] };
      })
    );
    addPopupItems("Note Updated!", "update");
  }

  function addNote(e) {
    e.preventDefault();
    const [currentBook] = queryCurrentBook();
    const formData = new FormData(e.currentTarget);
    const newNote = Object.fromEntries(formData.entries());
    setLibrary((prev) =>
      prev.map((book) => {
        if (book.id !== currentBook.id) return book;
        return {
          ...book,
          notes: [
            {
              id: uid(16),
              contents: newNote.contents,
              position: { x: 100, y: 100 },
              page: book.currentPage,
              zIndex: 999,
              styles: {
                backgroundColor: newNote.pickedColorBackground,
                textStyles: {
                  fill: newNote.pickedColorText,
                  wordWrapWidth: 400 - 30,
                  wordWrap: true,
                },
              },
            },
            ...book.notes,
          ],
        };
      })
    );
    addPopupItems("New Note Added!", "add");
  }

  function removeCurrentBook() {
    dialogRef.current.close();
    setIsSidebarActive(false);
    const [currentBook, currentLibraryState] = queryCurrentBook();
    setLibrary(currentLibraryState);
    addPopupItems("Book Removed!", "remove");
  }

  function removeCurrentNote() {
    setLibrary((prev) => {
      return prev.map((book) => {
        if (currentBook.id !== book.id) return book;
        const filteredNotes = currentBook.notes.filter(
          (note) => note.id !== selectedNote.id
        );
        return { ...book, notes: filteredNotes };
      });
    });
    addPopupItems("Note Removed!", "remove");
  }

  async function removePopupItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPopupItems((prev) => prev.filter((item, i) => i === prev.length));
        return resolve("remove");
      }, 1500);
    });
  }

  function addPopupItems(text, action) {
    const newpopupItems = { text, action };
    setPopupItems([newpopupItems, ...popupItems]);
  }

  function openDialogBox() {
    dialogRef.current.showModal();
  }

  function returnSidebarBtn(e) {
    e.stopPropagation();
    const target = e.currentTarget;
    setSidebarBtn(target.id);
    console.log(target.id);
  }

  useEffect(() => {
    if (library.length !== 0) {
      return navigate(library[0].id);
    }
  }, []);

  // checking if the library state has changed (deleted or added)
  // then routes users to the first book in the library
  useEffect(() => {
    if (prevState !== library.length) {
      if (library.length !== 0) {
        return navigate(library[0].id);
      }
      navigate("/");
    }
  }, [library]);

  // updates the currentBook when user opens different books
  useEffect(() => {
    setCurrentBook(queryCurrentBook()[0]);
  }, [window.location.pathname]);

  // updates the currentBook when something changed within the library state
  useEffect(() => {
    setCurrentBook(queryCurrentBook()[0]);
  }, [library]);

  useEffect(() => {
    if (popupItems.length > 0 && popupItems.length < 2) {
      removePopupItems().then((result) => {
        console.log(result);
      });
    }
  }, [popupItems]);

  // if popup is added means that the user did an action
  // eg: adding updating deleting
  // close sidebar if actions are emitted
  useEffect(() => {
    if (popupItems.length > 0) {
      setIsSidebarActive(false);
    }
  }, [popupItems]);

  return (
    <main
      id="main-contents"
      className={AppStyles.main}
      onClick={(e) => {
        const target = e.target;
        if (target.id === "main-contents") {
          setIsSidebarActive(false);
        }
      }}
    >
      {window.location.pathname !== "/" && (
        <DialogBox
          ref={dialogRef}
          handleOnConfirm={removeCurrentBook}
          currentBook={currentBook}
        />
      )}
      <LibraryContext.Provider
        value={{
          currentBook,
          setCurrentBook,
          library,
          prevState,
          setLibrary,
          openEditNotePanelOnClick,
          popupItems,
        }}
      >
        <TopBarContext.Provider
          value={{ returnSidebarBtn, setIsSidebarActive, isSidebarActive }}
        >
          <Topbar />
        </TopBarContext.Provider>
        <SidebarContext.Provider
          value={{
            currentBook,
            addBook,
            addNote,
            removeCurrentNote,
            editNote,
            openDialogBox,
            currentNote: selectedNote,
            currentPanel: sidebarBtn,
            editBook,
            setIsSidebarActive,
            library,
          }}
        >
          {isSidebarActive && <Sidebar />}
        </SidebarContext.Provider>
        {library.length !== 0 && <Outlet />}
      </LibraryContext.Provider>
    </main>
  );
}

export default App;
