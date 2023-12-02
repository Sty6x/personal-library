import PopupItem from "./popup-item/PopupItem.jsx";
import popupContainerStyles from "./popupContainer.module.css";
const PopupContainer = ({ children }) => {
  return <ul className={`${popupContainerStyles.container}`}>{children}</ul>;
};

export default PopupContainer;
