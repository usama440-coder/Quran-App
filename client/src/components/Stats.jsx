import { Box, Typography } from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const Stats = ({ number, desc, colorContent, colorIconBack, colorBack }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: { sm: 250 },
        width: "100%",
        alignItems: "center",
        color: colorContent,
        backgroundColor: colorBack,
        p: 2,
        borderRadius: 3,
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ color: colorContent }}>
          {number}
        </Typography>
        <Typography variant="body2">{desc}</Typography>
      </Box>
      <PeopleOutlineOutlinedIcon
        sx={{
          fontSize: 40,
          backgroundColor: colorIconBack,
          p: 1,
          borderRadius: 50,
        }}
      />
    </Box>
  );
};

export default Stats;
