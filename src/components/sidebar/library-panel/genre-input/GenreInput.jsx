import { useEffect, useRef, useState } from "react";
import Genre from "./genre/Genre";
import genreInputStyles from "./genreInput.module.css";

const GenreInput = ({ genreList, handleOnAdd }) => {
  const currentSidebarWidth = useRef();
  const userInputRef = useRef();

  function wrapGenresInList() {
    const newSidebarWidth = document.getElementById("side-bar");
    console.log(newSidebarWidth.offsetWidth);
    if (newSidebarWidth.offsetWidth > currentSidebarWidth.current) {
      console.log("too much contents not wrapping");
    }
  }

  useEffect(() => {
    wrapGenresInList();
  }, [genreList]);

  useEffect(() => {
    currentSidebarWidth.current = document.getElementById("side-bar").offsetWidth;
  }, []);

  const displayGenres = genreList.map((genre, i) => {
    return <Genre key={`${genre}${i}`} genreText={genre} />;
  });

  return (
    <div className={`${genreInputStyles.container}`}>
      <div id="genre-input" className={`${genreInputStyles.inputContainer}`}>
        <label htmlFor="genre-input">Genre</label>
        <span className={`${genreInputStyles.innerInputContainer}`}>
          <input ref={userInputRef} id="genre-input" />
          <button
            type="button"
            onClick={() => {
              handleOnAdd(userInputRef);
            }}
            style={{ color: "white" }}
          >
            {">"}
          </button>
        </span>
      </div>
      <div className={`${genreInputStyles.genreLists}`}>{displayGenres}</div>
    </div>
  );
};

export default GenreInput;
