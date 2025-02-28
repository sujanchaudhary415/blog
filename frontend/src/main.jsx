import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import { MarvelProvider } from "./context/MarvelContext";
import { AnimeProvider } from "./context/AnimeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <MarvelProvider>
          <AnimeProvider>
            <App />
          </AnimeProvider>
        </MarvelProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
