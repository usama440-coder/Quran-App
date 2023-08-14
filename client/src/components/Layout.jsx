import * as React from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const drawerWidth = 240;

// links for drawer menu
const links = [
  {
    text: "Dashboard",
    path: "/",
    icon: <SpaceDashboardOutlinedIcon />,
  },
  {
    text: "Students",
    path: "/students",
    icon: <PeopleOutlinedIcon />,
  },
  {
    text: "Teachers",
    path: "/teachers",
    icon: <PeopleOutlinedIcon />,
  },
  {
    text: "Courses",
    path: "/courses",
    icon: <LibraryBooksOutlinedIcon />,
  },
  {
    text: "Fee",
    path: "/fee",
    icon: <LocalAtmOutlinedIcon />,
  },
];

// general menu for mobile and other screens drawer
export const TempDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Toolbar />
      <Box
        sx={{
          overflow: "auto",
          mt: 1,
        }}
      >
        <List>
          {links.map((item) => {
            return (
              <ListItem sx={{ color: "black" }} key={item.path} disablePadding>
                <ListItemButton onClick={() => navigate(`${item.path}`)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <Divider />
          <ListItem sx={{ color: "black" }} key="login" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // drawer toggler
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* app bar above drawer component */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              position: "absolute",
              left: "20px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src="/img/bismillah.png" alt="bismillah-header" width={200} />
        </Toolbar>
      </AppBar>

      {/* for mobile screen */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          display: { sm: "block", md: "none" },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <TempDrawer />
      </Drawer>

      {/* for above medium screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            backgroundImage: "url('/img/nav_back.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: 180,
            backgroundPositionX: "center",
            backgroundPositionY: "bottom",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <TempDrawer />
      </Drawer>

      {/* box contains the actual content */}
      {/* children is any page depending on url */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
