import { ComponentStyleConfig } from '@chakra-ui/theme'


export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: "60px",
        fontsize: "10pt",
        fontWeight: "700",
        _focus: {
            boxShadow: "none",
        },
    },
    sizes: {
        sm: {
            fontsize: "8pt",
        },
        md: {
            fontsize: "10pt",
            // height: "28px",
        },
    },
    variants: {
        solid: {
            color: "white",
            bg: "blue.500",
            _hover: {
                bg: "blue.400",
            },
        },
        outline: {
            color: "blue.500",
            border: "1px solid",
            borderColor: "blue.500",
        },
        oauth: {

            height: "34px",
            border: "1px solid",
            borderColor: "gray.300",
            _hover: {
                bg: "gray.50",
            },

        },
    },
}
