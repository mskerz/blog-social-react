import { Switch } from "@headlessui/react";
import { useTheme } from "../hook/useTheme";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";


const MotionIconButton = motion(IconButton);




export default function ThemeToggle() {
  const { toggleColorMode, isDark } = useTheme()


  return (
    <MotionIconButton
      aria-label="Toggle theme mode"
      onClick={toggleColorMode}
      icon={isDark ? <FaMoon /> : <FaSun />}
      variant="ghost"
      rounded="full"
      whileTap={{ scale: 0.9, rotate: 45 }}
      transition={{ type: "spring", stiffness: 300 }}

    />
  );
}
