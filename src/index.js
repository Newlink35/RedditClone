import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeProvider, useColorMode } from "@chakra-ui/react";
import { theme } from "./chakra/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ColorModeProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </ColorModeProvider>

);
