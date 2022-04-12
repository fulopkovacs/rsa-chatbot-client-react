import { Outlet } from "react-router-dom";
import { ExperimentConfigContextProvider } from "./ExperimentConfigContext";
import PageWithBreakpoints from "./ui-components/PageWithBreakpoints";

function App() {
  return (
    <div>
      <header className="bg-green-500 text-sm text-white text-center py-1">
        CogniBot
      </header>
      <ExperimentConfigContextProvider>
        <div className="pt-7 pb-3 fixed h-full w-full overflow-auto">
          <PageWithBreakpoints>
            <Outlet />
          </PageWithBreakpoints>
        </div>
      </ExperimentConfigContextProvider>
    </div>
  );
}

export default App;
