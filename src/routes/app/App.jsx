import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("/book1");
    navigate("/book1");
  }, []);

  return (
    <main id="main-contents" className={AppStyles.main}>
      <Topbar />
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default App;
