import { uid } from "uid";
import { createContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";
import { placeholders } from "../../utils/placeholderLibrary.js";
import filterArrItems from "../../utils/filterArray.js";

export const TopBarContext = createContext();
export const LibraryContext = createContext();
export const SidebarContext = createContext();

// what updates the app?
// adding, editing, deleting, selecting a note, sidebar activities
// outlets (book routes) are not supposed to update when sidebar states are changed.

function App() {
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [sidebarBtn, setSidebarBtn] = useState("edit-book-panel");
  const [library, setLibrary] = useState([...placeholders]);
  const [selectedNote, setSelectedNote] = useState(undefined);

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
    setIsSidebarActive(false);
  }

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
    const formData = new FormData(e.currentTarget);
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
          }
        }
      }
      console.log(updatedEdittedNote)
      return updatedEdittedNote;
    });
    setLibrary(prev => prev.map(book => {
      if (book.link !== currentBook.link) return book
      return { ...currentBook, notes: [...updateNotes] }
    }))

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
  }

  useEffect(() => {
    navigate(library[0].link);
  }, [library]);

  useEffect(() => {
    navigate(library[0].link);
  }, []);

  function returnSidebarBtn(e) {
    e.stopPropagation();
    const target = e.currentTarget;
    setSidebarBtn(target.id);
    console.log(target.id);
  }

  return (
    <main id="main-contents" className={AppStyles.main}>
      <LibraryContext.Provider
        value={{ library, setLibrary, openEditNotePanelOnClick }}
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
            editNote,
            currentNote: selectedNote,
            currentPanel: sidebarBtn,
            editBook,
            setIsSidebarActive,
            library,
          }}
        >
          {isSidebarActive && <Sidebar />}
        </SidebarContext.Provider>
        <Outlet />
      </LibraryContext.Provider>
    </main>
  );
}

export default App;
