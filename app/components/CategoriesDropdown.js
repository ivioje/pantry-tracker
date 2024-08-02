import * as React from "react";

import Button from "@mui/material/Button";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const CategoriesDropdown = ({
  newItem,
  setNewItem,
  categories,
  setCategories,
  openAddCategoryModal,
  setOpenAddCategoryModal,
}) => {
  const handleChange = (event) => {
    setNewItem({ ...newItem, category: event.target.value });
  };

  const handleAdd = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <Box>
      {openAddCategoryModal && (
        <AddCategoryModal
          open={openAddCategoryModal}
          setOpen={setOpenAddCategoryModal}
          handleAdd={handleAdd}
        />
      )}
      <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
        <InputLabel id="demo-select-small-label">Category</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={newItem.category}
          label="category"
          onChange={handleChange}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default CategoriesDropdown;

{
  /**add category component */
}
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
    }
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
          className="my-4 w-full"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddCategory}>
          Add
        </Button>
      </FormControl>
    </Modal>
  );
};
