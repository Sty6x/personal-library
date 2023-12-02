import PopupItem from "./popup-item/PopupItem.jsx";
import popupContainerStyles from "./popupContainer.module.css";
const PopupContainer = () => {
  const popupTexts = [
    { text: "New Book added", action: "add" },
    { text: "Book deleted", action: "delete" },
    { text: "Note deleted", action: "delete" },
    { text: "New Note added", action: "add" },
    { text: "Note updated", action: "update" },
  ];

  const mapPopupItems = popupTexts.map(({ text, action }) => {
    return <PopupItem text={text} action={action} />;
  });

  return (
    <ul className={`${popupContainerStyles.container}`}>{mapPopupItems}</ul>
  );
};

export default PopupContainer;
