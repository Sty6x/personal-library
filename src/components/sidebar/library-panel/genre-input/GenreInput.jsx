import { useEffect, useRef } from "react";
import Genre from "./genre/Genre";
import genreInputStyles from "./genreInput.module.css";

const GenreInput = () => {
  const genreList = ["Drama", "Psychological", "Psychological", "Nautical", "Thriller", "History"];
  const currentSidebarWidth = useRef();

  function wrapGenresInList() {
    const newSidebarWidth = document.getElementById("side-bar");
    console.log(newSidebarWidth.offsetWidth);
    if (newSidebarWidth.offsetWidth > currentSidebarWidth) {
      console.log("too much contents not wrapping");
    }
  }

  useEffect(() => {
    currentSidebarWidth.current = document.getElementById("side-bar").offsetWidth;
  }, []);

  function addGenre(e) {
    const inputData = new FormData(e.target);
    const inputText = Object.fromEntries(inputData);
    console.log(inputText);
  }

  const displayGenres = genreList.map((genre) => {
    // return <Genre genreText={genre} />;
  });

  return (
    <div className={`${genreInputStyles.container}`}>
      <form onSubmit={addGenre} id="genre-input" className={`${genreInputStyles.inputContainer}`}>
        <label htmlFor="genre-input">Genre</label>
        <input id="genre-input" name="genreInput" />
        <button style={{ color: "white" }}>Add</button>
      </form>
      <div className={`${genreInputStyles.genreLists}`}>{displayGenres}</div>
    </div>
  );
};

export default GenreInput;
