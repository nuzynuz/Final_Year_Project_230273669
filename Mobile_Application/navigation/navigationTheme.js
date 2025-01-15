import { DefaultTheme } from "@react-navigation/native";

import colors from "../config/colors";

//Overrride colors
export default {
  ...DefaultTheme, //spread
  colors: {
    ...DefaultTheme.colors,
    //Override some color properties
    primary: colors.primary,
    background: colors.white,
  },
};
