import { useEffect, useMemo, useState } from "react";
import colorPickerStyles from "./colorPicker.module.css";
const ColorPicker = ({
  title,
  currentColor,
  prevColors,
  updatePreviousColors,
  name,
}) => {
  // if the local storage for pickedColors array is empty
  // then use default colors state
  const [defaultColor, setdefaultColor] = useState(currentColor);
  const colorNumbers = 6;

  useEffect(() => {
    setdefaultColor(currentColor);
  }, [currentColor]);

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
            const color = e.currentTarget.dataset.color;
            const target = e.currentTarget;
            setdefaultColor(color);
            console.log(name);
            updatePreviousColors(color, name);
          }}
          id={prevColors[i]}
          data-color={prevColors[i]}
          className={`${colorPickerStyles.colors} ${name}`}
          style={{
            backgroundColor: `${prevColors[i]}`,
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
