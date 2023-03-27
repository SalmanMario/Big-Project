import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export function BookItem({ author, title, description, coverImageURL }) {
  return (
    <Box>
      <Typography variant="h6">{author}</Typography>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
      <img src={coverImageURL} alt="photo" />
    </Box>
  );
}
