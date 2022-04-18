import { useContext, useState } from "react";
import { ExperimentConfigContext } from "../ExperimentConfigContext";
import PageTitle from "../ui-components/PageTitle";

function Outro() {
  const contextValue = useContext(ExperimentConfigContext);

  const outroData = contextValue?.experimentConfig?.outro || {
    title: "",
    body: "",
  };

  const { title, body } = outroData;

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <p>{body}</p>
    </>
  );
}

export default Outro;
