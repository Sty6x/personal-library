import { createContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";

export const TopBarContext = createContext();

function App() {
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [sidebarBtn, setSidebarBtn] = useState();

  useEffect(() => {
    console.log("/book1");
    navigate("/book1");
  }, []);

  function activateSidebar() {
    return isSidebarActive ? setIsSidebarActive(false) : setIsSidebarActive(true);
  }

  function returnSidebarBtn(e) {
    e.stopPropagation();
    const target = e.currentTarget;
    setSidebarBtn(target.id);
    console.log(target.id);
  }

  return (
    <main id="main-contents" className={AppStyles.main} onClick={returnSidebarBtn}>
      <TopBarContext.Provider value={{ returnSidebarBtn, activateSidebar, isSidebarActive }}>
        <Topbar />
      </TopBarContext.Provider>
      {isSidebarActive && <Sidebar currentPanel={sidebarBtn} />}
      <Outlet />
    </main>
  );
}

export default App;
