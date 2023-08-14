import { Typography, Container, Box } from "@mui/material";
import Stats from "../../components/Stats";
import { useEffect, useState } from "react";
import statsService from "../../services/statsService";
import { LinearProgress } from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { useSelector } from "react-redux";

const iconStyle = {
  fontSize: 40,
  p: 1,
  borderRadius: 50,
};

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.admin.token);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await statsService.getStats(token);
        setStats({
          students: res?.data?.totalStudents,
          teachers: res?.data?.totalTeachers,
          courses: res?.data?.totalCourses,
        });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [token]);

  return (
    <Container maxWidth="xl" sx={{ maxWidth: { xs: "400px", sm: "100%" } }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Stats
            number={stats?.students}
            desc="Total Students"
            colorContent="#319799"
            colorBack="#E4F3F4"
            icon={
              <PeopleOutlineOutlinedIcon
                sx={{ ...iconStyle, backgroundColor: "#D6EBEC" }}
              />
            }
          />
          <Stats
            number={stats?.teachers}
            desc="Total Teachers"
            colorContent="#EE734F"
            colorBack="#FDEEEA"
            icon={
              <PeopleOutlineOutlinedIcon
                sx={{ ...iconStyle, backgroundColor: "#FBDFD7" }}
              />
            }
          />
          <Stats
            number={stats?.courses}
            desc="Total Courses"
            colorContent="#6772CA"
            colorBack="#e3eaf7"
            icon={
              <LibraryBooksOutlinedIcon
                sx={{ ...iconStyle, backgroundColor: "#d3d6f3" }}
              />
            }
          />
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
