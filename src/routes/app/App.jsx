import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AppStyles from "./app.module.css";
function App() {
  return (
    <main id="main-contents" className={AppStyles.main}>
      <Topbar />
      <Sidebar />
      <div id="book-container">
        <h1>This is a book</h1>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
