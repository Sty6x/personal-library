import Book from "../routes/book/Book.jsx";
import App from "../routes/app/App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { getLocalStorage } from "./localStorage.js";
import StartingScreen from "../routes/StartingScreen.jsx";
import ErrorPage from "../components/error/ErrorPage.jsx";

export const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: getLocalStorage,
    errorElement: (
      <ErrorPage
        message={"The book that you're trying to access does not exist."}
      />
    ),
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
