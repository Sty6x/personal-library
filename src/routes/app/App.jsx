import { createContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";

export const TopBarContext = createContext();

function App() {
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    console.log("/book1");
    navigate("/book1");
  }, []);

  function activateSidebar() {
    return isSidebarActive ? setIsSidebarActive(false) : setIsSidebarActive(true);
  }

  return (
    <main id="main-contents" className={AppStyles.main}>
      <TopBarContext.Provider value={{ activateSidebar, isSidebarActive }}>
        <Topbar />
      </TopBarContext.Provider>
      {isSidebarActive && <Sidebar />}
      <Outlet />
    </main>
  );
}

export default App;
