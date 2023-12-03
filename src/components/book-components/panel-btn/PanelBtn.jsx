import panelBtnStyles from "./panelBtn.module.css";

const PanelBtn = ({ handleOnCancel, handleOnRemove, buttonText }) => {
  return (
    <div className={`${panelBtnStyles.panelBtnContainer}`}>
      <span
        id="book-panel-btn"
        className={`${panelBtnStyles.confirmCancelBtns}`}
      >
        <button>{buttonText}</button>
        <button
          onClick={() => {
            handleOnCancel((prev) => (prev ? false : true));
          }}
          type="button"
        >
          Cancel
        </button>
      </span>

      <button
        onClick={() => {
          handleOnCancel((prev) => (prev ? false : true));
        }}
        type="button"
      >
        Remove
      </button>
    </div>
  );
};

export default PanelBtn;
