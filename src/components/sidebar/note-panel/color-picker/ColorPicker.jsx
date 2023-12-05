import { useEffect, useMemo, useState } from "react";
import colorPickerStyles from "./colorPicker.module.css";
const ColorPicker = ({ title, currentColor }) => {
  // if the local storage for pickedColors array is empty
  // then use default colors state
  const [defaultColor, setdefaultColor] = useState(currentColor);
  const colorNumbers = 6;
  const defaultColors = [
    "#C7A2DE",
    "#AFDEA2",
    "#DF9368",
    "#DF7868",
    "#A2C1DE",
    "#6888DE",
    "#68DE8C",
    "#DE9C68",
    "#68A5DE",
    "#DE6868",
    "#CA68DE",
  ];

  useEffect(() => {
    setdefaultColor(currentColor);
  }, [currentColor]);

  const randomizeColors = useMemo(() => {
    return Math.floor(Math.random() * defaultColors.length);
  }, []);

  function handleColorChange(e) {
    const target = e.currentTarget;
    setdefaultColor(target.value);
  }

  const displayDefaultColors = () => {
    let tmpColors = [];
    for (let i = 0; i < colorNumbers; i++) {
      tmpColors.push(
        <span
          key={i}
          onClick={(e) => {
            setdefaultColor(e.currentTarget.dataset.color);
          }}
          id={defaultColors[randomizeColors]}
          data-color={defaultColors[randomizeColors]}
          className={`${colorPickerStyles.colors}`}
          style={{
            backgroundColor: `${defaultColors[randomizeColors]}`,
            ":hover": { outline: `2px solid red` },
          }}
        />
      );
    }
    return tmpColors;
  };
  const colors = displayDefaultColors();
  return (
    <div className={`${colorPickerStyles.container}`}>
      <p>{title}</p>
      <div
        id="color-picker-container"
        className={`${colorPickerStyles.colorInputContainer}`}
      >
        <div
          id={`prev-${title.toLowerCase()}-colors`}
          className={`${colorPickerStyles.colorContainer}`}
        >
          {colors}
        </div>
        <input
          className="inputs"
          type="color"
          name={`pickedColor${title}`}
          style={{ backgroundColor: defaultColor }}
          onChange={handleColorChange}
          value={defaultColor}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
