import genreInputStyles from "./genreInput.module.css";

const GenreInput = () => {
  return (
    <div className={`${genreInputStyles.container}`}>
      <div id="genre-input" className={`${genreInputStyles.inputContainer}`}>
        <label htmlFor="genre-input">Genre</label>
        <input id="genre-input" name="genreInput" />
      </div>
      <div className={`${genreInputStyles.genreLists}`}></div>
    </div>
  );
};

export default GenreInput;
