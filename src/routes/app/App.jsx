import { uid } from "uid";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";
import { placeholders } from "../../utils/placeholderLibrary.js";
import filterArrItems from "../../utils/filterArray.js";
import DialogBox from "../../components/book-components/dialog-box/DialogBox.jsx";
import usePrevState from "../../utils/hooks/usePrevState.jsx";
import { addItem, removeItem, updateItem } from "../../utils/localStorage.js";

export const TopBarContext = createContext();
export const LibraryContext = createContext();
export const SidebarContext = createContext();

// what updates the app?
// adding, editing, deleting, selecting a note, sidebar activities
// outlets (book routes) are not supposed to update when sidebar states are changed.
// mouse hovering over notes rerenders the app

function App() {
  const { localLibrary } = useLoaderData();
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [sidebarBtn, setSidebarBtn] = useState("library-panel");
  const [library, setLibrary] = useState(localLibrary);
  const [selectedNote, setSelectedNote] = useState(undefined);
  const prevState = usePrevState(library.length);
  const [currentBook, setCurrentBook] = useState(
    library.filter((book) => `/${book.id}` === window.location.pathname)[0]
  );
  const dialogRef = useRef();

  function queryCurrentBook() {
    const [queriedBook] = library.filter(
      (book) => `/${book.id}` === window.location.pathname
    );
    const currentLibraryState = library.filter(
      (book) => `/${book.id}` !== window.location.pathname
    );
    return [queriedBook, currentLibraryState];
  }

  function editBook(contents) {
    const [queriedBook, currentLibraryState] = queryCurrentBook();
    const updatedBook = {
      ...queriedBook,
      title: contents.title,
      author: contents.author,
      totalPages: Number(contents.totalPages),
      currentPage: Number(contents.currentPage),
      genre: [...contents.genre],
      lastUpdated: new Date(),
    };
    updateItem(updatedBook);
    setLibrary([updatedBook, ...currentLibraryState]);
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
    addItem(newBook);
    setLibrary((prev) => [newBook, ...prev]);
  }

  // selecting a note means that it needs to set all of the other notes' zIndex to 0
  function openEditNotePanelOnClick(clickedNote) {
    const [queriedBook] = queryCurrentBook();
    const noteText = clickedNote.children[1];
    setSidebarBtn("edit-note-panel");
    setIsSidebarActive(true);
    const currentNote = filterArrItems(
      queriedBook.notes,
      (note) => note.id.toString().localeCompare(clickedNote.name) === 0
    );
    setSelectedNote({ ...currentNote });
  }

  async function editNote(e, noteData) {
    const target = e.currentTarget;
    const formData = new FormData(target);
    const updatedNoteDataInputs = Object.fromEntries(formData.entries());
    const [queriedBook, currentLibraryState] = queryCurrentBook();

    const updateNotes = queriedBook.notes.map((note) => {
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
    const updatedBook = {
      ...queriedBook,
      lastUpdated: new Date(),
      notes: [...updateNotes],
    };
    setLibrary([updatedBook, ...currentLibraryState]);
    await updateItem(updatedBook);
  }

  async function addNote(e) {
    e.preventDefault();
    const [queriedBook, currentLibraryState] = queryCurrentBook();
    const formData = new FormData(e.currentTarget);
    const newNote = Object.fromEntries(formData.entries());
    const updatedBook = {
      ...queriedBook,
      lastUpdated: new Date(),
      notes: [
        {
          id: uid(16),
          contents: newNote.contents,
          position: { x: 100, y: 100 },
          page: queriedBook.currentPage,
          zIndex: 999,
          width: 400,
          height: 0,
          styles: {
            backgroundColor: newNote.pickedColorBackground,
            textStyles: {
              fill: newNote.pickedColorText,
              wordWrap: true,
            },
          },
        },
        ...queriedBook.notes,
      ],
    };
    setLibrary([updatedBook, ...currentLibraryState]);
    await updateItem(updatedBook);
  }

  async function removeCurrentBook() {
    dialogRef.current.close();
    setIsSidebarActive(false);
    const [queriedBook, currentLibraryState] = queryCurrentBook();
    await removeItem(queriedBook);
    setLibrary(currentLibraryState);
  }

  async function removeCurrentNote() {
    const [queriedBook, currentLibraryState] = queryCurrentBook();
    const updatedBook = {
      ...queriedBook,
      lastUpdated: new Date(),
      notes: queriedBook.notes.filter((note) => note.id !== selectedNote.id),
    };
    setLibrary([updatedBook, ...currentLibraryState]);
    await updateItem(updatedBook);
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

  return (
    <main
      autoFocus
      onKeyDown={(e) => {
        e.key === "Escape" && setIsSidebarActive(false);
      }}
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
