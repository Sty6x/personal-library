import { uid } from "uid";
import { createContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";
import { placeholders } from "../../utils/placeholderLibrary.js";

export const TopBarContext = createContext();
export const LibraryContext = createContext();
export const SidebarContext = createContext();

function App() {
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [sidebarBtn, setSidebarBtn] = useState("edit-book-panel");
  const [library, setLibrary] = useState([...placeholders]);

  function editBook(contents) {
    const mapLibrary = library.map((book) => {
      if (`/${book.link}` === window.location.pathname) {
        console.log(contents);
        const editedBook = {
          ...book,
          title: contents.title,
          author: contents.author,
          totalPages: contents.totalPages,
          currentPage: contents.currentPage,
        };
        return editedBook;
      }
      return book;
    });
    setLibrary(mapLibrary);
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

  useEffect(() => {
    navigate(library[0].link);
  }, [library]);

  useEffect(() => {
    console.log(library);
  }, [library]);

  function returnSidebarBtn(e) {
    e.stopPropagation();
    const target = e.currentTarget;
    setSidebarBtn(target.id);
    console.log(target.id);
  }

  return (
    <main id="main-contents" className={AppStyles.main}>
      <LibraryContext.Provider value={{ library }}>
        <TopBarContext.Provider
          value={{ returnSidebarBtn, setIsSidebarActive, isSidebarActive, addBook }}
        >
          <Topbar />
        </TopBarContext.Provider>
        <SidebarContext.Provider
          value={{
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
