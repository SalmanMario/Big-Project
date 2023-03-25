import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";

export function Footer() {
  return (
    <Box sx={{ p: 2, bgcolor: green["A400"] }} display="flex" justifyContent="center">
      <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, color: "#fff", fontSize: 20 }}>
        @2023 Created by Salman Mario, all right reserved
      </Typography>
    </Box>
  );
}
