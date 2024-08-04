import * as React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import AddCategoryModal from "./AddCategory";

const CategoriesDropdown = ({
  newItem,
  setNewItem,
  categories,
  openAddCategoryModal,
  setOpenAddCategoryModal,
}) => {
  const handleChange = (event) => {
    setNewItem({ ...newItem, category: event.target.value });
  };

  const handleAdd = async (newCategory) => {
    await addDoc(collection(db, "categories"), {
      name: newCategory.trim(),
    });
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
      <FormControl sx={{ minWidth: 160 }} size="small">
        <InputLabel id="demo-select-small-label">Select category*</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={newItem.category}
          label="category"
          onChange={handleChange}
          required
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.name}
              sx={{ textTransform: "capitalize" }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default CategoriesDropdown;
