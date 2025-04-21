import { Switch } from "@headlessui/react";
import { useTheme } from "../hook/useTheme";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button, IconButton } from "@chakra-ui/react";


export default function ThemeToggle() {
  const {toggleColorMode, isDark } = useTheme()


  return (
    <Button  onClick={toggleColorMode}  rounded={"full"} background={"transparent"}   >
      {isDark ? (
        <FaMoon />
      ) : (
        <FaSun    />
      )}
    </Button>
  );
}
