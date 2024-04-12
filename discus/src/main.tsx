import { ThemeProvider, createTheme } from "@mui/material";
import { blue, deepPurple } from "@mui/material/colors";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ChildProvider from "./providers/ChildProvider.tsx";
import ReduxProvider from "./providers/ReduxProvider.tsx";
import SocketProvider from "./providers/SocketProvider.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: blue[500],
    },
  },
  typography: {
    fontFamily: "Lato",
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontSize: 14,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ReduxProvider>
        <SocketProvider>
          <ChildProvider>
            <App />
          </ChildProvider>
        </SocketProvider>
      </ReduxProvider>
    </ThemeProvider>
  </BrowserRouter>
);
