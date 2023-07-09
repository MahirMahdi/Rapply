import { useContext } from "react";
import { ColorModeContext } from "../contexts/color-mode";

const useColorMode = () => {
  return useContext(ColorModeContext);
};

export default useColorMode;
