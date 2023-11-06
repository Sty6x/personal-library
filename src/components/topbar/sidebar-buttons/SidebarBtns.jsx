import { useContext, useState } from "react";
import sidebarBtnStyles from "./sidebarBtns.module.css";
import { TopBarContext } from "../../../routes/app/App";

const SidebarBtns = () => {
  const { returnSidebarBtn, setIsSidebarActive, isSidebarActive, addBook } =
    useContext(TopBarContext);
  const [currentActivePanel, setCurrentActivePanel] = useState("library-panel");
  function activateSidebar() {
    // return isSidebarActive ? setIsSidebarActive(false) : setIsSidebarActive(true);
    setIsSidebarActive(true);
  }

  return (
    <div id="sidebar-btns-container" className={`topbar-actions ${sidebarBtnStyles.container}`}>
      <span
        id="sidebar-btns"
        className={`topbarActionContainers ${sidebarBtnStyles.buttonsContainer}`}
      >
        <span>
          <button
            onClick={(e) => {
              activateSidebar();
              returnSidebarBtn(e);
              setCurrentActivePanel(e.currentTarget.id);
            }}
            id="library-panel"
            className={`${sidebarBtnStyles.libraryBtn} ${sidebarBtnStyles.btns}`}
          >
            <svg
              width="30"
              height="29"
              viewBox="0 0 38 29"
              // fill={currentActivePanel === "library-panel" ? "#DF7868" : "white"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={
                  currentActivePanel === "library-panel"
                    ? isSidebarActive
                      ? "#DF7868"
                      : "white"
                    : "white"
                }
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.16151 7.53999H12.4231C13.1495 7.53999 13.7384 8.05935 13.7384 8.69999V24.94C13.7384 25.5807 13.1495 26.1 12.4231 26.1H7.16151C6.43505 26.1 5.84613 25.5807 5.84613 24.94V8.69999C5.84613 8.05935 6.43505 7.53999 7.16151 7.53999ZM8.4769 17.98V22.62C8.4769 23.2607 9.06582 23.78 9.79228 23.78C10.5187 23.78 11.1077 23.2607 11.1077 22.62V17.98C11.1077 17.3393 10.5187 16.82 9.79228 16.82C9.06582 16.82 8.4769 17.3393 8.4769 17.98ZM16.3692 2.89999H21.6307C22.3572 2.89999 22.9461 3.41935 22.9461 4.05999V24.94C22.9461 25.5807 22.3572 26.1 21.6307 26.1H16.3692C15.6427 26.1 15.0538 25.5807 15.0538 24.94V4.05999C15.0538 3.41935 15.6427 2.89999 16.3692 2.89999ZM17.6846 15.66V22.62C17.6846 23.2607 18.2735 23.78 19 23.78C19.7265 23.78 20.3154 23.2607 20.3154 22.62V15.66C20.3154 15.0193 19.7265 14.5 19 14.5C18.2735 14.5 17.6846 15.0193 17.6846 15.66ZM25.5769 5.21999H30.8384C31.5649 5.21999 32.1538 5.73935 32.1538 6.37999V24.94C32.1538 25.5807 31.5649 26.1 30.8384 26.1H25.5769C24.8504 26.1 24.2615 25.5807 24.2615 24.94V6.37999C24.2615 5.73935 24.8504 5.21999 25.5769 5.21999ZM26.8923 20.3V22.62C26.8923 23.2607 27.4812 23.78 28.2077 23.78C28.9342 23.78 29.5231 23.2607 29.5231 22.62V20.3C29.5231 19.6593 28.9342 19.14 28.2077 19.14C27.4812 19.14 26.8923 19.6593 26.8923 20.3Z"
              />
            </svg>
          </button>
        </span>
        <span>
          <button
            onClick={(e) => {
              activateSidebar();
              returnSidebarBtn(e);
              setCurrentActivePanel(e.currentTarget.id);
            }}
            id="note-panel"
            className={`${sidebarBtnStyles.sidebarBtn}  ${sidebarBtnStyles.btns}`}
          >
            <svg
              width="30"
              height="29"
              viewBox="0 0 38 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33331 5.79999H31.6666M6.33331 14.5H31.6666M6.33331 23.2H31.6666"
                stroke={
                  currentActivePanel === "edit-panel"
                    ? isSidebarActive
                      ? "#DF7868"
                      : "white"
                    : "white"
                }
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
          </button>
        </span>
      </span>
      <button
        onClick={(e) => {
          addBook();
          // activateSidebar();
          // returnSidebarBtn(e);
          // setCurrentActivePanel(e.currentTarget.id);
        }}
        id="add-book-panel"
        className={`${sidebarBtnStyles.addBookBtn} ${sidebarBtnStyles.bookBtn}`}
      >
        <svg
          width="30"
          height="29"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="11.5" stroke="#DF7868" strokeWidth="2" />
          <path
            d="M17.3238 12.8191H13.2667V16.9333H11.6477V12.8191H7.60956V11.3524H11.6477V7.21906H13.2667V11.3524H17.3238V12.8191Z"
            fill="#DF7868"
          />
        </svg>
      </button>
      <button
        onClick={(e) => {
          activateSidebar();
          returnSidebarBtn(e);
          setCurrentActivePanel(e.currentTarget.id);
        }}
        id="edit-book-panel"
        className={`${sidebarBtnStyles.editBookBtn} ${sidebarBtnStyles.bookBtn}`}
      >
        <svg
          width="30"
          height="29"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005Z"
            stroke="#DF7868"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
            stroke="#DF7868"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
export default SidebarBtns;
