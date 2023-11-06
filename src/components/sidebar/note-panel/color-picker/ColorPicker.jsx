import colorPickerStyles from "./colorPicker.module.css";
const ColorPicker = ({ title }) => {
  // if the local storage for pickedColors array is empty
  // then use default colors state
  const colorNumbers = 5;
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

  const displayDefaultColors = () => {
    let tmpColors = [];
    for (let i = 0; i < colorNumbers; i++) {
      const randomizeColors = Math.floor(Math.random() * defaultColors.length);
      console.log(randomizeColors);
      tmpColors.push(
        <span
          id={defaultColors[randomizeColors]}
          data-color={defaultColors[randomizeColors]}
          className={`${colorPickerStyles.colors}`}
          style={{ backgroundColor: `${defaultColors[randomizeColors]}` }}
        />,
      );
    }
    return tmpColors;
  };
  const colors = displayDefaultColors();
  return (
    <div className={`${colorPickerStyles.container}`}>
      <p>{title}</p>
      <div id="color-picker-container" className={`${colorPickerStyles.colorInputContainer}`}>
        <div
          id={`prev-${title.toLowerCase()}-colors`}
          className={`${colorPickerStyles.colorContainer}`}
        >
          {colors}
        </div>
        <input
          type="color"
          name="pickedColor"
          defaultValue={defaultColors[Math.floor(Math.random() * defaultColors.length)]}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
