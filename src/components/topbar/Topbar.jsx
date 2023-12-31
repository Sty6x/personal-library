import TopbarStyles from "./topbar.module.css";
import "./topbar.global.css";
import SidebarBtns from "./sidebar-buttons/SidebarBtns";
import ZoomBtns from "./zoom-buttons/ZoomBtns";
import CurrentBookTitle from "./current-book-title/CurrentBookTitle";
import { useContext, useEffect, useState } from "react";
import { TopBarContext } from "../../routes/app/App";

const Topbar = () => {
  const { library } = useContext(TopBarContext);
  const [displayBook, setDisplayBook] = useState(false);

  useEffect(() => {
    if (library.some((book) => `/${book.id}` === location.pathname)) {
      setDisplayBook(true);
      return;
    }
    setDisplayBook(false);
  }, [location.pathname]);

  return (
    <nav id="top-bar" className={TopbarStyles.navbar}>
      <SidebarBtns disableButtons={!displayBook} />
      {displayBook && <CurrentBookTitle />}

      <ZoomBtns />
    </nav>
  );
};

export default Topbar;
