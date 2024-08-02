import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FolderIcon from "@mui/icons-material/Folder";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import CategoryIcon from "@mui/icons-material/Category";
import { Typography } from "@mui/material";

export default function LeftDrawer({
  open,
  toggleDrawer,
  handleOpenAll,
  handleOpenNew,
  handleOpenOld,
  handleOpenReplacements,
  handleOpenTrash,
}) {
  const categories = ["bread", "canned foods"];
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {/**folders */}
      <List>
        <Typography className="font-bold text-gray-500 px-1 mt-5">
          Folders
        </Typography>{" "}
        {/**all */}
        <ListItem onClick={handleOpenAll} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DensitySmallIcon />
            </ListItemIcon>
            <ListItemText primary={"All"} />
          </ListItemButton>
        </ListItem>
        {/**new pantry */}
        <ListItem onClick={handleOpenNew} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FiberNewIcon />
            </ListItemIcon>
            <ListItemText primary={"New Pantry"} />
          </ListItemButton>
        </ListItem>
        {/**old pantry */}
        <ListItem onClick={handleOpenOld} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"Old Pantry"} />
          </ListItemButton>
        </ListItem>
        {/**used pantry */}
        <ListItem onClick={handleOpenReplacements} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AutorenewIcon />
            </ListItemIcon>
            <ListItemText primary={"For Replacement"} />
          </ListItemButton>
        </ListItem>
        {/**trash */}
        <ListItem onClick={handleOpenTrash} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FolderDeleteIcon />
            </ListItemIcon>
            <ListItemText primary={"Trash"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {/**categories */}
      <List>
        <Typography className="font-bold text-gray-500 px-1 mt-5">
          Pantry Categories
        </Typography>
        {categories.length === 0 && (
          <div className="text-sm px-2 py-3">No categories yet</div>
        )}
        {categories.length &&
          categories.map((text, index) => (
            <ListItem key={text} className="capitalize" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <Box className="flex items-center">
                  <ListItemText>{text}</ListItemText>
                  <CloseIcon className="ml-5 p-[5px] cursor-pointer" />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
