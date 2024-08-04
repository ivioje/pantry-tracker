"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Copyright from "./Footer";
import LeftDrawer from "./LeftDrawer";
import AllPantryItems from "./AllPantry";
import { db } from "../firebase";
import AddPantry from "./AddPantry";
import CaptureImage from "./CapturePantryItem";

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [openAll, setOpenAll] = React.useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = React.useState(false);
  const [pantry, setPantry] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingRows, setLoadingRows] = React.useState({});
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openCapture, setOpenCapture] = React.useState(false);
  const [newItem, setNewItem] = React.useState({
    name: "",
    quantity: 1,
    category: "",
  });

  const handleOpenAddCategoryModal = () => setOpenAddCategoryModal(true);
  const defaultTheme = createTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const formValidation = () => {
    if (newItem.name === "" && newItem.category === "") {
      toast.error("fill in all fields!");
      return;
    } else setLoading(true);
  };

  //add item
  const addItemToPantry = async (e) => {
    e.preventDefault();
    formValidation();
    if (newItem.name !== "" && newItem.category !== "") {
      await addDoc(collection(db, "pantry"), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
        category: newItem.category.trim(),
        createdAt: new Date(),
      });
      setNewItem({ name: "", quantity: 1, category: "" });
      setLoading(false);
      toast.success("Item added to pantry!");
    }
  };

  //read items
  const getItemsFromPantry = async () => {
    const itemsQuery = query(collection(db, "pantry"));
    onSnapshot(itemsQuery, (QuerySnapshot) => {
      let pantryArr = [];

      QuerySnapshot.forEach((doc) => {
        pantryArr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPantry(pantryArr);
    });
  };

  //read categories
  const getCategories = async () => {
    const categoriesQuery = query(collection(db, "categories"));
    onSnapshot(categoriesQuery, (QuerySnapshot) => {
      let categoriesArr = [];

      QuerySnapshot.forEach((doc) => {
        categoriesArr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setCategories(categoriesArr);
    });
  };

  React.useEffect(() => {
    getCategories();
    getItemsFromPantry();
  }, []);

  // delete item
  const handleDelete = async (id) => {
    setLoadingRows((prev) => ({ ...prev, [id]: true }));
    await deleteDoc(doc(db, "pantry", id));
    setLoadingRows((prev) => ({ ...prev, [id]: false }));
    toast.success("Deleted successfully");
  };

  //delete categoey
  const handleDeleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    toast.success("Deleted");
  };

  //update item
  const handleUpdateItem = async (id, updatedData) => {
    const itemRef = doc(db, "pantry", id);
    await updateDoc(itemRef, updatedData);
    toast.success("Item updated successfully");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <ToastContainer position="top-center" autoClose={1000} />
        <CssBaseline />
        <Button
          className="absolute top-3 right-2"
          variant="contained"
          onClick={() => setOpenCapture(!openCapture)}
        >
          Scan Pantry Item
        </Button>
        {openCapture && <CaptureImage />}
        {open && (
          <LeftDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            categories={categories}
            handleDeleteCategory={handleDeleteCategory}
          />
        )}
        {openAll && (
          <AllPantryItems
            openAll={openAll}
            setOpenAll={setOpenAll}
            data={pantry}
            handleDelete={handleDelete}
            loading={loadingRows}
            handleUpdateItem={handleUpdateItem}
            setOpenEditModal={setOpenEditModal}
            openEditModal={openEditModal}
            categories={categories}
          />
        )}
        {/**menu icon */}
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

        <AddPantry
          addItemToPantry={addItemToPantry}
          newItem={newItem}
          setNewItem={setNewItem}
          categories={categories}
          setCategories={setCategories}
          openAddCategoryModal={openAddCategoryModal}
          setOpenAddCategoryModal={setOpenAddCategoryModal}
          handleOpenAddCategoryModal={handleOpenAddCategoryModal}
          loading={loading}
          setOpenAll={setOpenAll}
          toggleDrawer={toggleDrawer}
        />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
