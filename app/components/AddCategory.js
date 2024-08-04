import * as React from "react";
import {
  Modal,
  FormControl,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const AddCategoryModal = ({ open, setOpen, handleAdd }) => {
  const [newCategory, setNewCategory] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    setNewCategory("");
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== "") {
      handleAdd(newCategory);
      handleClose();
      toast.success("Successfully added category!");
    }
    if (newCategory === "") console.log("name is required");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <FormControl sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a Category
        </Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          required
          className="my-4 w-full"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button
          disabled={newCategory === ""}
          variant="contained"
          onClick={handleAddCategory}
        >
          Add
        </Button>
      </FormControl>
    </Modal>
  );
};

export default AddCategoryModal;
