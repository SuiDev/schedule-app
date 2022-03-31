import React, { useState } from "react";

/** Material UI Modules */
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
/** Material UI Icons */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

// ヘッダー
const Header = () => {
  /** お知らせボタンの状態管理 */
  const [notifications, setNotifications] = useState(null);
  const openNotifications = Boolean(notifications);
  const handleNotifications = event => {
    setNotifications(event.currentTarget);
  };
  const handleNotificationsClose = () => {
    setNotifications(null);
  };

  /** ユーザーメニューボタンの状態管理 */
  const [userMenu, setUserMenu] = useState(null);
  const openUserMenu = Boolean(userMenu);
  const handleUserMenu = event => {
    setUserMenu(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  /** お知らせ内容 */
  const NotificationContents = () => {
    return (
      <>
        <MenuItem>
          <Avatar /> お知らせ1
        </MenuItem>
        <Divider />
        <MenuItem>
          <Avatar /> お知らせ2
        </MenuItem>
      </>
    );
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: "#02576C",
        }}
        elevation={0}
      >
        <Toolbar>
          {/** タイトル */}
          <Typography
            sx={{
              flexGrow: 1,
              ml: 5,
              fontSize: 22,
            }}
            variant="body1"
            color="white"
          >
            Remtas
          </Typography>
          {/** お知らせボタン */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleNotifications}
            aria-controls={openNotifications ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openNotifications ? "true" : undefined}
          >
            <NotificationsNoneIcon />
          </IconButton>
          <Menu
            anchorEl={notifications}
            id="notifications"
            open={openNotifications}
            onClose={handleNotificationsClose}
            onClick={handleNotificationsClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <NotificationContents />
          </Menu>
          {/** ユーザーメニュー */}
          <Button
            aria-controls={openUserMenu ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openUserMenu ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleUserMenu}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              backgroundColor: "#02576C",
              mr: 5,
              fontSize: 16,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#02576C",
              },
            }}
          >
            test user
          </Button>
          <Menu
            anchorEl={userMenu}
            id="user-menu"
            open={openUserMenu}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>情報更新</MenuItem>
            <Divider />
            <MenuItem>ログアウト</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
