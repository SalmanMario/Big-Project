import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export function BookItem({ author, title, description, coverImageURL, id }) {
  return (
    <Box>
      <Typography variant="body1">{author}</Typography>
      <Typography variant="variant h1">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
      <img src={coverImageURL} alt="photo" />
    </Box>
  );
}
