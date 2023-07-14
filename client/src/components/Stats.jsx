import { Box, Typography } from "@mui/material";

const Stats = ({ number, desc, colorContent, colorBack, icon }) => {
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
      {icon}
    </Box>
  );
};

export default Stats;
