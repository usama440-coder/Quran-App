import { Typography, Container, Box } from "@mui/material";
import Stats from "../../components/Stats";

const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ maxWidth: { xs: "400px", sm: "100%" } }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Stats
          number="150"
          desc="Total Students"
          colorContent="#319799"
          colorIconBack="#D6EBEC"
          colorBack="#E4F3F4"
        />
        <Stats
          number="15"
          desc="Total Teachers"
          colorContent="#EE734F"
          colorIconBack="#FBDFD7"
          colorBack="#FDEEEA"
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
