import Book from "../routes/Book.jsx";
import App from "../routes/App.jsx";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":bookId",
        element: <Book />,
      },
    ],
  },
]);
