import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const EditItemModal = ({
  data,
  openEditModal,
  handleUpdateItem,
  setOpenEditModal,
  categories,
  newItem,
  setNewItem,
}) => {
  const handleEditItem = (item) => {
    const updatedData = {
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
    };
    handleUpdateItem(item.id, updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditItem(newItem);
    setOpenEditModal(false);
  };

  const onClose = () => {
    setOpenEditModal(false);
  };

  const handleChange = (event) => {
    setNewItem({ ...newItem, category: event.target.value });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={openEditModal} onClose={onClose}>
      <Box sx={style} className="flex flex-col">
        <Typography variant="h6" className="mb-8">
          Edit Item - {newItem.name}
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextField
            label="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <TextField
            label="Quantity"
            type="number"
            value={newItem.quantity}
            sx={{ marginY: "15px" }}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: Number(e.target.value) })
            }
            required
          />
          <FormControl size="autowidth">
            <InputLabel id="demo-select-autowidth-label">
              Select category*
            </InputLabel>
            <Select
              labelId="demo-select-autowidth-label"
              id="demo-select-autowidth"
              value={newItem.category}
              sx={{ marginY: "15px" }}
              label="category"
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.name}
                  sx={{ textTransform: "capitalize", width: "100%" }}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditItemModal;
