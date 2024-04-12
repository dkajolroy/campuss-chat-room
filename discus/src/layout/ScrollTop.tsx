import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  const { pathname } = useLocation();
  // for screen position top - navigate any screen
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
