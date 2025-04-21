import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#f5faff",
      100: "#cce4ff",
      200: "#99c9ff",
      300: "#66afff", 
      400: "#3394ff",
      500: "#f07aff", // Main color
      600: "#0064cc",
      700: "#004d99",
      800: "#003666",
      900: "#001f33", 

    },
  },
   // ตั้งค่าของ text สีในทุกๆ body
   styles: {
    global: (props) => ({
     "nav":{
        bg: props.colorMode === "dark" ? "gray.700" : "white", // background สีตาม mode

     },
     
     
    
     
      "body": {
        bg: props.colorMode === "dark" ? "gray.800" : "gray.200", // background สีตาม mode
        color: props.colorMode === "dark" ? "gray.200" : "gray.800", // สีของ text 
      },
    }),
  },
  components: {
    
    Button: {
      baseStyle: {
        fontWeight: "medium",
      },
     
      variants: {
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "gray.600" : "gray.200",
          color: props.colorMode === "dark" ? "white" : "black",      // กำหนดสีตัวอักษร
          _hover: {
            bg: props.colorMode === "dark" ? "gray.500" : "gray.100",
          },
          
        }),
      },
    },
  },
});

export  {theme};
