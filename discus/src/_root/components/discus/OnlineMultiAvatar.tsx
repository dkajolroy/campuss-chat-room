import { Avatar, Badge, Box, styled } from "@mui/material";

export default function OnlineMultiAvatar({
  receivers,
  online,
}: {
  receivers?: IUser[] | User[];
  online: boolean;
}) {
  // Active Indicator styles
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: online ? "#44b700" : "lightgray",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: online ? "ripple 1.2s infinite ease-in-out" : "ease",
        border: `1px solid ${online ? "currentColor" : "lightgray"}`,
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Box sx={{ width: "40px", height: "40px", position: "relative" }}>
        {receivers?.slice(0, 3).map((xx, index) => (
          <Avatar
            className={`${
              index === 0
                ? "left-0 bottom-0"
                : index === 1
                ? "top-0 left-1/2 -translate-x-1/2"
                : "bottom-0 right-0"
            } !absolute`}
            alt={xx.name}
            src={xx.image.secure_url}
            sx={{ width: 24, height: 24 }}
          />
        ))}
      </Box>
    </StyledBadge>
  );
}
