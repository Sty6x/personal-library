import { forwardRef } from "react";
import dialogBoxStyles from "./dialogBox.module.css";

const DialogBox = forwardRef(({ handleOnConfirm, currentBook }, ref) => {
  return (
    <dialog ref={ref} className={`${dialogBoxStyles.container}`}>
      <p>
        Are you sure you want to <span>Remove:</span>{" "}
      </p>
      <div className={dialogBoxStyles.contentContainer}>
        <div>
          <span className={dialogBoxStyles.bookTitle}>{currentBook.title}</span>{" "}
          by{" "}
          <span className={dialogBoxStyles.bookTitle}>
            {currentBook.author}
          </span>
          <p>
            and{" "}
            <span className={dialogBoxStyles.bookTitle}>
              {currentBook.notes.length} notes
            </span>
          </p>
        </div>
      </div>
      <span className={`${dialogBoxStyles.btnContainer}`}>
        <button type="button" onClick={handleOnConfirm}>
          Confirm
        </button>
        <button type="button" onClick={() => ref.current.close()}>
          Cancel
        </button>
      </span>
    </dialog>
  );
});

export default DialogBox;
