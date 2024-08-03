import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { CircularProgress } from "@mui/material";
import EditItemModal from "./EditPantryItem";

const AllPantryItems = ({
  openAll,
  setOpenAll,
  data,
  handleDelete,
  loading,
  openEditModal,
  setOpenEditModal,
  handleUpdateItem,
  categories,
}) => {
  const [newItem, setNewItem] = React.useState(data);

  const handleClose = () => setOpenAll(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const openModal = (item) => {
    setNewItem(item);
    setOpenEditModal(true);
  };

  React.useEffect(() => {
    setNewItem(data);
  }, [data]);

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  };

  const columns = [
    { field: "name", headerName: "Item name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "delete",
      type: "actions",
      headerName: "Delete",
      width: 200,
      getActions: (params) => [
        loading[params.id] ? (
          <GridActionsCellItem
            icon={<CircularProgress size={24} />}
            label="Loading"
            disabled
          />
        ) : (
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={() => handleDelete(params.id)}
          />
        ),
      ],
    },
    {
      field: "update",
      type: "actions",
      headerName: "Update",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<UpgradeIcon />}
          label="Update"
          onClick={() => openModal(params.row)}
        />,
      ],
    },
  ];

  const rows = data.map((item) => ({
    id: item.id,
    name: toTitleCase(item.name),
    quantity: item.quantity,
    category: toTitleCase(item.category),
  }));

  return (
    <div>
      <EditItemModal
        setOpenEditModal={setOpenEditModal}
        openEditModal={openEditModal}
        data={data}
        handleUpdateItem={handleUpdateItem}
        categories={categories}
        newItem={newItem}
        setNewItem={setNewItem}
      />
      <Modal
        keepMounted
        open={openAll}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            My Pantry ✨
          </Typography>
          <Typography className="mb-5 text-sm">
            Find all your pantry items here!
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AllPantryItems;
