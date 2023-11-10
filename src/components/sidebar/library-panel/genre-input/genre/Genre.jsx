import genreStyles from "./genre.module.css";

const Genre = ({ genreText, id, handleOnClick }) => {
  return (
    <span id={`genre-${id}`} className={`${genreStyles.container}`}>
      <p>{genreText}</p>
      <button type="button" onClick={handleOnClick}>
        <svg
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="cancelIconTitle"
          strokeWidth="2"
          strokeLinecap="rounded"
          strokeLinejoin="miter"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title id="cancelIconTitle">Cancel</title>{" "}
            <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339"></path>{" "}
            <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z"></path>{" "}
          </g>
        </svg>
      </button>
    </span>
  );
};
export default Genre;
