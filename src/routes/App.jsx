import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div id="book-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
