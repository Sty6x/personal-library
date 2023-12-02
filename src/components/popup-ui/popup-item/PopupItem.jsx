import popupItemStyles from "./popupItem.module.css";
import deleteItemIcon from "../../../assets/icons/personal-library/delete-icon.svg";
import successItemIcon from "../../../assets/icons/personal-library/success-icon.svg";
const PopupItem = ({ text, action }) => {
  return (
    <li className={`popup-item ${popupItemStyles.container}`}>
      <span className={`popup-contents ${popupItemStyles.contentsContainer}`}>
        <p className={`${popupItemStyles.text}`}>{text}</p>
        <span
          style={{
            backgroundImage: `url(${
              action === "add" || action === "update"
                ? successItemIcon
                : deleteItemIcon
            }) `,
          }}
        />
      </span>
    </li>
  );
};

export default PopupItem;
