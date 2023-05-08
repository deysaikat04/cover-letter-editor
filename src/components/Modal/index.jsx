import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

export default function BasicModal({
  open,
  setOpen,
  autoFillPassword,
  setAutoFillPassword,
  verifyPassword,
}) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 100,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <FormControl>
            <FormLabel>Password </FormLabel>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              type="text"
              id="date"
              value={autoFillPassword}
              onChange={(event) => setAutoFillPassword(event.target.value)}
            />
          </FormControl>
          <Button
            sx={{ float: "right" }}
            disabled={autoFillPassword.length < 4}
            onClick={() => verifyPassword()}
          >
            Verify
          </Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
