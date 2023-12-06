import { useContext, useEffect, useState } from "react";
import bookPanelStyles from "./bookPanel.module.css";
import { SidebarContext } from "../../../routes/app/App";
import GenreInput from "../library-panel/genre-input/GenreInput";
import PanelBtn from "../../book-components/panel-btn/PanelBtn";

const BookPanel = ({ panelTitle, buttonText, handleButton, currentBook }) => {
  const { setIsSidebarActive, openDialogBox } = useContext(SidebarContext);
  const [genreList, setGenreList] = useState([...currentBook.genre]);

  function addGenre(input) {
    if (input.current.value !== "") {
      setGenreList([input.current.value, ...genreList]);
      console.log(input.current.value);
      input.current.value = "";
      return;
    }
  }

  function removeGenre(e) {
    const currentGenre = e.currentTarget.parentNode.id;
    const currentGenreIndex = currentGenre.charAt(currentGenre.length - 1);
    const filterGenres = genreList.filter(
      (genre) => genreList[currentGenreIndex] !== genre
    );
    setGenreList(filterGenres);
  }

  useEffect(() => {
    console.log(currentBook);
  }, [window.location.pathname]);
  return (
    <div id="book-panel" className={`${bookPanelStyles.container}`}>
      <p>{panelTitle}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const formEntries = Object.fromEntries(formData.entries());
          console.log(formEntries);
          handleButton({ ...formEntries, genre: genreList });
          // setIsSidebarActive(false);
        }}
        className={`${bookPanelStyles.editContainer}`}
      >
        <div className={`${bookPanelStyles.inputsContainer}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={currentBook !== undefined ? currentBook.title : ""}
          />
        </div>
        <div className={`${bookPanelStyles.inputsContainer}`}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            defaultValue={currentBook !== undefined ? currentBook.author : ""}
          />
        </div>
        <span className={`${bookPanelStyles.pagesCountContainer}`}>
          <div className={`${bookPanelStyles.inputsContainer}`}>
            <label htmlFor="book-pages">Book pages</label>
            <input
              min={0}
              type="number"
              name="totalPages"
              id="book-pages"
              defaultValue={currentBook ? currentBook.totalPages : 0}
            />
          </div>
          <div className={`${bookPanelStyles.inputsContainer}`}>
            <label htmlFor="current-page">Current page</label>
            <input
              min={0}
              max={currentBook.totalPages}
              type="number"
              name="currentPage"
              id="current-page"
              defaultValue={currentBook ? currentBook.currentPage : 0}
            />
          </div>
        </span>
        <GenreInput
          genreList={genreList}
          handleOnAdd={addGenre}
          handleOnRemoveGenre={removeGenre}
        />
        <PanelBtn
          handleOnRemove={openDialogBox}
          handleOnCancel={setIsSidebarActive}
          buttonText={buttonText}
        />
      </form>
    </div>
  );
};

export default BookPanel;
