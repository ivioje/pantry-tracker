"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import { Typography } from "@mui/material";

const LeftDrawer = ({
  open,
  toggleDrawer,
  categories,
  handleDeleteCategory,
}) => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <List>
          <Typography
            variant="h5"
            className="font-bold text-gray-500 px-1 mt-5 mb-5"
          >
            Pantry Categories
          </Typography>
          {categories.length === 0 && (
            <div className="text-sm px-2 py-3">No categories yet</div>
          )}
          {categories.length &&
            categories.map((category) => (
              <ListItem key={category.id} className="capitalize" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <Box className="flex items-center justify-between w-full">
                    <ListItemText>{category.name}</ListItemText>
                    <CloseIcon
                      className="ml-5 p-[5px] cursor-pointer"
                      onClick={() => handleDeleteCategory(category.id)}
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default LeftDrawer;
