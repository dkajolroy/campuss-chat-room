import { Avatar, Badge, styled } from "@mui/material";

export default function OnlineAvatar({
  receiver,
  online,
}: {
  receiver?: IUser | User;
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
      <Avatar alt={receiver?.name} src={receiver?.image.secure_url} />
    </StyledBadge>
  );
}
