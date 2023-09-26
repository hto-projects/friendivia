import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

export const Button = styled(MuiButton)((props) => ({
  background: "var(--main)",
  textTransform: "none",
  fontFamily: "var(--action-font)",
  "&:hover": {
    background: "var(--main-dark)"
  }
}));
