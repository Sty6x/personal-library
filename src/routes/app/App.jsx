import { createContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";

export const TopBarContext = createContext();
export const LibraryContext = createContext();

function App() {
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [sidebarBtn, setSidebarBtn] = useState("library-panel");

  const placeholders = [
    {
      author: "Haruki Murakamiwdadawdawdwa",
      title: "Killing Commendatore",
      totalPages: 367,
      currentPage: 0,
      isFinished: false,
      genre: ["Physchological", "Fantasy", "History", "Noveldawdawdawdawdwadwadadawd"],
      link: "book1",
    },

    {
      author: "Herman Melville",
      title: "Moby Dick",
      totalPages: 523,
      currentPage: 263,
      isFinished: false,
      genre: ["Epic", "Nautical", "Adventure Fiction"],
      link: "book2",
    },

    {
      author: "Fyodor Dostoyevsky",
      title: "Crime and Punishment",
      totalPages: 490,
      currentPage: 461,
      isFinished: false,
      genre: ["Novel", "Psychological", "Crime", "Philosophical"],
      link: "book3",
    },

    {
      author: "Anne Frank",
      title: "Diary of a Young Girl",
      totalPages: 365,
      currentPage: 250,
      isFinished: false,
      genre: ["Biography", "Autobiography", "Diary", "Personal Narrative"],
      link: "book4",
    },
    {
      author: "Viktor Frankl",
      title: "Man's Search For Meaning",
      totalPages: 490,
      currentPage: 461,
      isFinished: false,
      genre: ["Biography", "Autobiography", "Personal Narrative"],
      link: "book5",
    },
    {
      author: "Niccolo Machiavelli",
      title: "Prince",
      totalPages: 224,
      currentPage: 51,
      isFinished: false,
      genre: ["Autobiography", "History"],
      link: "book6",
    },
    {
      author: "Osamu Dazai",
      title: "No Longer Human",
      totalPages: 262,
      currentPage: 152,
      isFinished: false,
      genre: ["Novel", "Fiction"],
      link: "book7",
    },
  ];
  const [library, setLibrary] = useState([...placeholders]);
  useEffect(() => {
    console.log("/book1");
    navigate("/book1");
  }, []);

  function returnSidebarBtn(e) {
    e.stopPropagation();
    const target = e.currentTarget;
    setSidebarBtn(target.id);
    console.log(target.id);
  }

  return (
    <main id="main-contents" className={AppStyles.main}>
      <LibraryContext.Provider value={{ library }}>
        <TopBarContext.Provider value={{ returnSidebarBtn, setIsSidebarActive, isSidebarActive }}>
          <Topbar />
        </TopBarContext.Provider>
        {isSidebarActive && <Sidebar currentPanel={sidebarBtn} />}
        <Outlet />
      </LibraryContext.Provider>
    </main>
  );
}

export default App;
