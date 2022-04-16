import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import IntroPage from "./pages/IntroPage";
import ChatSessionsPage from "./pages/ChatSessionsPage";
import Outro from "./pages/Outro";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="entry" element={<AuthPage />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="chat-sessions" element={<ChatSessionsPage />} />
          <Route path="outro" element={<Outro />} />
          <Route path="*" element={<Navigate to="/entry" replace={true} />} />
          {/*
           * INFO: This last `Route` makes sure that the `AuthPage` component
           * is displayed when there's no  other match.
           */}
          <Route index element={<Navigate to="/entry" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
