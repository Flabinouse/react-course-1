import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

const handleOpenModalCard = () => {
    setOpen(true);
  };

  const handleCloseModalCard = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloseModalCard}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField id="Title" label="Title" variant="outlined" />
        </DialogContent>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalCard}>Cancel</Button>
          <Button onClick={handleCloseModalCard}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
