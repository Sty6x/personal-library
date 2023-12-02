import PopupItem from "./popup-item/PopupItem.jsx";
import popupContainerStyles from "./popupContainer.module.css";
const PopupContainer = () => {
  const popupStrings = [
    { string: "New Book added", action: "add" },
    { string: "Book deleted", action: "delete" },
    { string: "Note deleted", action: "delete" },
    { string: "New Note added", action: "add" },
    { string: "Note updated", action: "update" },
  ];

  const mapPopupItems = popupStrings.map((item) => {
    return <PopupItem />;
  });

  return (
    <ul className={`${popupContainerStyles.container}`}>{mapPopupItems}</ul>
  );
};

export default PopupContainer;
