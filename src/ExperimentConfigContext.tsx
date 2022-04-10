import { createContext, useReducer, useState } from "react";

export interface IExperimentConfig {
  conditions: number;
}

export interface IValue {
  setExperimentConfig: React.Dispatch<
    React.SetStateAction<IExperimentConfig | null>
  >;
  experimentConfig?: IExperimentConfig | null;
}

const ExperimentConfigContext = createContext<IValue | null>(null);

const ExperimentConfigContextProvider: React.FC<{}> = ({ children }) => {
  const [experimentConfig, setExperimentConfig] =
    useState<IExperimentConfig | null>(null);

  const value = { experimentConfig, setExperimentConfig };
  // INFO: Getting the value of the provider from `state.value` instead of
  // directly from `value` is required to avoid this caveat:
  // https://reactjs.org/docs/context.html#caveats
  const state = { value };

  return (
    <ExperimentConfigContext.Provider value={state.value}>
      {children}
    </ExperimentConfigContext.Provider>
  );
};

export { ExperimentConfigContext, ExperimentConfigContextProvider };
