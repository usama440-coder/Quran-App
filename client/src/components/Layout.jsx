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
} from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
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
    text: "Fee",
    path: "/fee",
    icon: <LocalAtmOutlinedIcon />,
  },
];

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src="/img/bismillah.png" alt="bismillah-header" width={200} />
        </Toolbar>
      </AppBar>
      {mobileOpen ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", mt: 1 }}>
            <List>
              {links.map((item) => {
                return (
                  <ListItem
                    sx={{ color: "black" }}
                    key={item.path}
                    disablePadding
                  >
                    <ListItemButton onClick={() => navigate(`${item.path}`)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      ) : (
        ""
      )}
      {/* <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 1 }}>
          <List>
            {links.map((item) => {
              return (
                <ListItem
                  sx={{ color: "black" }}
                  key={item.path}
                  disablePadding
                >
                  <ListItemButton onClick={() => navigate(`${item.path}`)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
