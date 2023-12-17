import { useEffect, useRef, useState } from "react";
import Genre from "./genre/Genre";
import genreInputStyles from "./genreInput.module.css";

const GenreInput = ({ genreList, handleOnAdd, handleOnRemoveGenre }) => {
  const userInputRef = useRef();

  const displayGenres = genreList.map((genre, i) => {
    return (
      <Genre
        key={`${genre}${i}`}
        id={i}
        genreText={genre}
        handleOnClick={handleOnRemoveGenre}
      />
    );
  });

  return (
    <div className={`${genreInputStyles.container}`}>
      <div id="genre-input" className={`${genreInputStyles.inputContainer}`}>
        <label htmlFor="genre-input">Genre</label>
        <span className={`${genreInputStyles.innerInputContainer}`}>
          <input maxLength={16} ref={userInputRef} id="genre-input" />
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
