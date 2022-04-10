import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthPage from "./AuthPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Intro() {
  return <h2>Intro</h2>;
}

function Trials() {
  return <h2>Conditions</h2>;
}

function Outro() {
  return <h2>Outro</h2>;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="entry" element={<AuthPage />} />
          <Route path="intro" element={<Intro />} />
          <Route path="trials" element={<Trials />} />
          <Route path="outro" element={<Outro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
