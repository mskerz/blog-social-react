import { useColorMode } from "@chakra-ui/react";

export const useTheme = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // ฟังก์ชันสำหรับเปลี่ยนไปโหมดมืด
  const setDarkMode = () => {
    setColorMode("dark");
  };

  // ฟังก์ชันสำหรับเปลี่ยนไปโหมดสว่าง
  const setLightMode = () => {
    setColorMode("light"); 
  };

  return { colorMode, toggleColorMode, isDark, setDarkMode, setLightMode };
};
