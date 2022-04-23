import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExperimentConfigContext } from "../ExperimentConfigContext";
import PageTitle from "../ui-components/PageTitle";

function Outro() {
  const contextValue = useContext(ExperimentConfigContext);
  const navigate = useNavigate();

  const outroData = contextValue?.experimentConfig?.outro || {
    title: "",
    body: "",
  };

  useEffect(() => {
    // TODO: Find a better way to redirect to the `/entry` page when
    // the config is missing
    if (!contextValue?.experimentConfig?.outro) navigate("/entry");
  });

  const { title, body } = outroData;

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <p>{body}</p>
    </>
  );
}

export default Outro;
