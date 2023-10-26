import Book from "../routes/book/Book.jsx";
import App from "../routes/app/App.jsx";
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
