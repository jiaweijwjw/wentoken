import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  components: {
    Button: {
      variants: {
        shadow: (props: any) => {
          return {
            color: "black",
            bg: "white",
            boxShadow: "0px 4px 10px rgba(83, 83, 83, 0.25)",
            _hover: {
              bg: "gray.100",
            },
          };
        },
        normal: (props: any) => {
          return {
            color: "black",
            bg: "white",
            border: "1px solid black",
            _hover: {
              bg: "gray.100",
            },
          };
        },
        "normal-dark": (props: any) => {
          return {
            color: "white",
            bg: "black",
            _hover: {
              bg: "gray.600",
            },
          };
        },
        "dark-shadow": (props: any) => {
          return {
            color: "white",
            bg: "black",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            _hover: {
              bg: "gray.600",
            },
          };
        },
      },
    },
  },
});

export default theme;
