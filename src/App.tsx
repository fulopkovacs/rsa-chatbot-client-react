import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="bg-green-500 text-sm text-white text-center py-1">
        CogniBot
      </header>
      <div className="flex w-full justify-center">
        <div className="w-full md:max-w-3xl mx-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
