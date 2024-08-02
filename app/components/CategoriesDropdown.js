import * as React from "react";
import PropTypes from "prop-types";
import { Select as BaseSelect, selectClasses } from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import Link from "next/link";
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
  openAddCategoryModal,
  setOpenAddCategoryModal,
}) => {
  // console.log("categories", newItem.category);

  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <Box>
      {openAddCategoryModal && (
        <AddCategoryModal
          open={openAddCategoryModal}
          setOpen={setOpenAddCategoryModal}
          newItem={newItem}
          setNewItem={setNewItem}
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
          {Object.keys(newItem).forEach(function (key, index) {
            <MenuItem value={newItem["category"]}>
              {newItem["category"]}
            </MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
export default CategoriesDropdown;

{
  /**add category component */
}
const AddCategoryModal = ({
  open,
  setOpen,
  newItem,
  setNewItem,
  handleAdd,
}) => {
  const handleClose = () => setOpen(false);

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
    <div>
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
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </FormControl>
      </Modal>
    </div>
  );
};
