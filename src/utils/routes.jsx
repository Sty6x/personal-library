import Book from "../routes/book/Book.jsx";
import App from "../routes/app/App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { getLocalStorage } from "./localStorage.js";
import StartingScreen from "../routes/StartingScreen.jsx";

export const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: getLocalStorage,
    children: [
      {
        path: "/:bookId",
        element: <Book />,
      },

      {
        path: "/start",
        element: <StartingScreen />,
      },
    ],
  },
]);
