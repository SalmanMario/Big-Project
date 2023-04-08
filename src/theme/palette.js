import { green } from "@mui/material/colors";

export const palette = {
    palette: {
        primary: {
            main: green["A400"],
            contrastText: "#fff",
        },
    },
    typography: {
        button: {
            marginBottom: "1rem",
            marginTop: "1rem",
            fontFamily: "Montserrat",
            fontWeight: 700,
        },
        h4: {
            fontFamily: "Montserrat",
            fontWeight: 700,
        },
        h5: {
            fontFamily: "Montserrat",
            fontWeight: 500,
        },
        body1: {
            fontFamily: "Inter",
        },
        h2: {
            fontFamily: "Montserrat",
            fontWeight: 700,
        },
        h3: {
            fontFamily: "Montserrat",
            fontWeight: 700,
        },
        components: {
            MuiInput: {
                styleOverrides: {
                    input: {
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        fontSize: 16,
                    },
                },
            },
        },

    },
    card: {
        maxWidth: 320,
        margin: "auto",
    },
    media: {
        width: "100%",
        objectFit: "cover",
    },
};