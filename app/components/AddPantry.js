"use client";
import React from "react";
import Counter from "./Counter";
import CategoriesDropdown from "./CategoriesDropdown";
import Link from "next/link";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const AddPantry = ({
  addItemToPantry,
  newItem,
  setNewItem,
  categories,
  setCategories,
  openAddCategoryModal,
  setOpenAddCategoryModal,
  handleOpenAddCategoryModal,
  loading,
  setOpenAll,
  toggleDrawer,
}) => {
  return (
    <Box
      sx={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <EventAvailableIcon
        sx={{ m: 2, height: 40, width: 40 }}
      ></EventAvailableIcon>
      <Typography component="h1" variant="h5">
        Pantry Tracker
      </Typography>
      <Box
        component="form"
        onSubmit={addItemToPantry}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Add pantry item"
          name="name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          autoFocus
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "45%" }}>
              <CategoriesDropdown
                newItem={newItem}
                setNewItem={setNewItem}
                categories={categories}
                setCategories={setCategories}
                openAddCategoryModal={openAddCategoryModal}
                setOpenAddCategoryModal={setOpenAddCategoryModal}
              />
            </Box>
            <Box sx={{ width: "55%" }}>
              <Counter newItem={newItem} setNewItem={setNewItem} />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              paddingY: "4px",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "12px",
            }}
            onClick={handleOpenAddCategoryModal}
          >
            Create category
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add{" "}
          {loading && (
            <CircularProgress size={16} className="text-white mx-2" />
          )}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href="#"
              className="underline text-blue-500"
              variant="body2"
              onClick={() => setOpenAll(true)}
            >
              Pantry
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              className="underline text-blue-500"
              onClick={toggleDrawer(true)}
            >
              Pantry Categories
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddPantry;
