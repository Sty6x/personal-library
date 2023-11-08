import genreStyles from "./genre.module.css";

const Genre = ({ genreText }) => {
  return (
    <span id="genre-item" className={`${genreStyles.container}`}>
      <p>{genreText}</p>
      <button />
    </span>
  );
};
export default Genre;
