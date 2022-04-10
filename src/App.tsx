import { Outlet } from "react-router-dom";
import { ExperimentConfigContextProvider } from "./ExperimentConfigContext";

function App() {
  return (
    <div>
      <header className="bg-green-500 text-sm text-white text-center py-1">
        CogniBot
      </header>
      <ExperimentConfigContextProvider>
        <div className="flex w-full justify-center">
          <div className="w-full md:max-w-3xl mx-6">
            <Outlet />
          </div>
        </div>
      </ExperimentConfigContextProvider>
    </div>
  );
}

export default App;
