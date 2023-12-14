import { useEffect, useMemo, useState } from "react";
import colorPickerStyles from "./colorPicker.module.css";
import { itemExist } from "../../../../utils/localStorage";
const ColorPicker = ({ title, currentColor, prevColors }) => {
  // if the local storage for pickedColors array is empty
  // then use default colors state
  const [defaultColor, setdefaultColor] = useState(currentColor);
  const placeholderColors = [
    "#C7A2DE",
    "#AFDEA2",
    "#DF9368",
    "#DF7868",
    "#A2C1DE",
    "#6888DE",
  ];
  const [previousColors, setPreviousColors] = useState(placeholderColors);
  const colorNumbers = 6;

  console.log(itemExist("if"));

  useEffect(() => {
    setdefaultColor(currentColor);
  }, [currentColor]);

  function handleColorChange(e) {
    const target = e.currentTarget;
    setdefaultColor(target.value);
    updatePreviousColors(target.value);
  }

  function updatePreviousColors(color) {
    const maximumColors = 6;
    const removeExtraColor = previousColors.filter(
      (color, i) => i !== maximumColors
    );
    setPreviousColors([color, ...removeExtraColor]);
  }

  const displayDefaultColors = () => {
    let tmpColors = [];
    for (let i = 0; i < colorNumbers; i++) {
      tmpColors.push(
        <span
          key={i}
          onClick={(e) => {
            const color = e.currentTarget.dataset.color;
            updatePreviousColors(color);
            setdefaultColor(color);
          }}
          id={previousColors[i]}
          data-color={previousColors[i]}
          className={`${colorPickerStyles.colors}`}
          style={{
            backgroundColor: `${previousColors[i]}`,
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
