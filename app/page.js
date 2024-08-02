"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Container, Button, TextField } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./components/Footer";
import Counter from "./components/Counter";
import CategoryDropdown from "./components/CategoriesDropdown";
import LeftDrawer from "./components/LeftDrawer";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import AllPantryItems from "./components/folders/AllPantry";
import NewPantryItems from "./components/folders/NewPantry";
import OldPantryItems from "./components/folders/OldPantry";
import PantryForReplacement from "./components/folders/Replacement";
import Trash from "./components/folders/Trash";
import { collection, addDoc } from "firebase/firestore";

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [openAll, setOpenAll] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [openOld, setOpenOld] = React.useState(false);
  const [openReplacements, setOpenReplacements] = React.useState(false);
  const [openTrash, setOpenTrash] = React.useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = React.useState(false);
  const [pantry, setPantry] = React.useState([]);
  const [categories, setCategories] = React.useState(["liquid", "veggies"]);
  const [newItem, setNewItem] = React.useState({
    name: "",
    quantity: 1,
    category: "",
  });

  const handleOpenAll = () => setOpenAll(true);
  const handleOpenNew = () => setOpenNew(true);
  const handleOpenOld = () => setOpenOld(true);
  const handleOpenReplacements = () => setOpenReplacements(true);
  const handleOpenTrash = () => setOpenTrash(true);
  const handleOpenAddCategoryModal = () => setOpenAddCategoryModal(true);

  const defaultTheme = createTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //add item
  const addItemToPantry = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.category !== "") {
      setPantry((prevPantry) => {
        const updatedPantry = [...prevPantry, newItem];
        console.log("Updated pantry:", updatedPantry);
        return updatedPantry;
      });
    }
  };

  //read item

  // delete item

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        {open && (
          <LeftDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            handleOpenAll={handleOpenAll}
            handleOpenNew={handleOpenNew}
            handleOpenOld={handleOpenOld}
            handleOpenReplacements={handleOpenReplacements}
            handleOpenTrash={handleOpenTrash}
          />
        )}
        {openAll && (
          <AllPantryItems openAll={openAll} setOpenAll={setOpenAll} />
        )}
        {openNew && (
          <NewPantryItems openNew={openNew} setOpenNew={setOpenNew} />
        )}
        {openOld && (
          <OldPantryItems openOld={openOld} setOpenOld={setOpenOld} />
        )}
        {openReplacements && (
          <PantryForReplacement
            openReplacements={openReplacements}
            setOpenReplacements={setOpenReplacements}
          />
        )}
        {openTrash && (
          <Trash openTrash={openTrash} setOpenTrash={setOpenTrash} />
        )}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
          }}
          onClick={toggleDrawer(true)}
        >
          <LunchDiningIcon className="text-[30px] opacity-90" />
        </Box>
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
                  <CategoryDropdown
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
              Add
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={toggleDrawer(true)}>
                  Folders
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={toggleDrawer(true)}>
                  Pantry Categories
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
