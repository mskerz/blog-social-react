import { IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";

const MotionIconButton = motion(IconButton);

export default function MobileMenuButton({ onToggle, isOpen }) {
    return (
        <MotionIconButton
            aria-label="Toggle menu"
            onClick={onToggle}
            variant="ghost"
            rounded="full"
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            icon={
                <motion.div
                    key={isOpen ? "close" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{type:"spring", duration: 0.3, ease: "easeInOut" }}
                >
                    {isOpen ? <IoClose size="1.5em" /> : <IoMenu size="1.5em" />}
                </motion.div>
            }
        />
    );
}
