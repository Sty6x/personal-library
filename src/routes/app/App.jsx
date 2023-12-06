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
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [sidebarBtn, setSidebarBtn] = useState("library-panel");
  const [library, setLibrary] = useState([...placeholders]);
  const [selectedNote, setSelectedNote] = useState(undefined);
  const prevState = usePrevState(library.length);
  const [popupItems, setPopupItems] = useState([]);
  const [currentBook, setCurrentBook] = useState(
    library.filter((book) => `/${book.link}` === window.location.pathname)[0]
  );
  const dialogRef = useRef();

  function queryCurrentBook() {
    const [currentBook] = library.filter(
      (book) => `/${book.link}` === window.location.pathname
    );
    const currentLibraryState = library.filter(
      (book) => `/${book.link}` !== window.location.pathname
    );
    return [currentBook, currentLibraryState];
  }

  function editBook(contents) {
    const [currentBook, currentLibraryState] = queryCurrentBook();
    const updatedBook = {
      ...currentBook,
      title: contents.title,
      author: contents.author,
      totalPages: contents.totalPages,
      currentPage: contents.currentPage,
      genre: [...contents.genre],
    };
    setLibrary([updatedBook, ...currentLibraryState]);
    addPopupItems("Book Updated!", "update");
  }

  function addBook() {
    const newBook = {
      title: "",
      author: "",
      genre: [],
      notes: [],
      totalPages: 0,
      currentPage: 0,
      link: uid(16),
      isFinished: false,
    };
    setLibrary((prev) => [newBook, ...prev]);
    addPopupItems("Added New Book!", "add");
  }

  // selecting a note means that it needs to set all of the other notes' zIndex to 0
  function openEditNotePanelOnClick(pe) {
    const [currentBook] = queryCurrentBook();
    const selectedNote = pe.currentTarget;
    setSidebarBtn("edit-note-panel");
    setIsSidebarActive(true);
    const currentNote = filterArrItems(
      currentBook.notes,
      (note) => note.id.toString().localeCompare(selectedNote.name) === 0
    );
    setSelectedNote(currentNote);
  }

  function editNote(e, noteData) {
    const target = e.currentTarget;
    const formData = new FormData(target);
    const updatedNoteDataInputs = Object.fromEntries(formData.entries());
    const [currentBook] = queryCurrentBook();
    const updateNotes = currentBook.notes.map((note) => {
      if (note.id !== selectedNote.id) return note;
      const updatedEdittedNote = {
        ...note,
        contents: noteData.contents,
        page: noteData.page,
        styles: {
          ...note.styles,
          backgroundColor: updatedNoteDataInputs.pickedColorBackground,
          textStyles: {
            ...note.styles.textStyles,
            fill: updatedNoteDataInputs.pickedColorText,
          },
        },
      };
      console.log(updatedEdittedNote);
      return updatedEdittedNote;
    });
    setLibrary((prev) =>
      prev.map((book) => {
        if (book.link !== currentBook.link) return book;
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
    console.log(newNote);
    const updatedBook = {
      ...currentBook,
      notes: [
        {
          id: uid(16),
          contents: newNote.contents,
          position: { x: 100, y: 100 },
          page: currentBook.currentPage,
          styles: {
            backgroundColor: newNote.pickedColorBackground,
            textStyles: {
              fill: newNote.pickedColorText,
              wordWrapWidth: 400 - 30,
              wordWrap: true,
            },
          },
        },
        ...currentBook.notes,
      ],
    };
    setLibrary((prev) =>
      prev.map((book) => {
        if (`/${book.link}` === window.location.pathname) {
          console.log(updatedBook);
          return updatedBook;
        }
        return book;
      })
    );
    addPopupItems("New Note Added!", "add");
  }

  function removeCurrentBook() {
    dialogRef.current.close();
    setIsSidebarActive(false);
    const [currentBook, currentLibraryState] = queryCurrentBook();
    console.log(currentLibraryState);
    setLibrary(currentLibraryState);
    addPopupItems("Book Removed!", "remove");
  }

  function removeCurrentNote() {
    const filteredNotes = currentBook.notes.filter(
      (note) => note.id !== selectedNote.id
    );
    console.log(filteredNotes);
    setLibrary((prev) => {
      return prev.map((book) => {
        if (currentBook.link !== book.link) return book;
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
      return navigate(library[0].link);
    }
  }, []);

  // checking if the library state has changed (deleted or added)
  // then routes users to the first book in the library
  useEffect(() => {
    if (prevState !== library.length) {
      if (library.length !== 0) {
        return navigate(library[0].link);
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
  // close if actions are emitted
  useEffect(() => {
    if (popupItems.length > 0) {
      setIsSidebarActive(false);
    }
  }, [popupItems]);

  return (
    <main id="main-contents" className={AppStyles.main}>
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
