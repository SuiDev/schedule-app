import React from "react";
import { Link } from "react-router-dom";

/** Material UI Modules */
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
/** Material UI Icons */
import AddTaskIcon from "@mui/icons-material/AddTask";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

// サイドメニューバー
const MenuBar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        {/** タスク一覧 */}
        <List>
          <ListItem button key={"タスク一覧"} component={Link} to="/">
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={"タスク一覧"} />
          </ListItem>
        </List>
        {/** タスク作成 */}
        <List>
          <ListItem button key={"タスク作成"} component={Link} to="/new">
            <ListItemIcon>
              <AddTaskIcon />
            </ListItemIcon>
            <ListItemText primary={"タスク作成"} />
          </ListItem>
        </List>
        <Divider />
        {/** 知り合い管理 */}
        <List>
          <ListItem
            button
            key={"知り合い管理"}
            component={Link}
            to="/acquaintance"
          >
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={"知り合い管理"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default MenuBar;
