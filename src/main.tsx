import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import IntroPage from "./pages/IntroPage";
import TrialsPage from "./pages/Trials";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Outro() {
  return <h2>Outro</h2>;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="entry" element={<AuthPage />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="trials" element={<TrialsPage />} />
          <Route path="outro" element={<Outro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
