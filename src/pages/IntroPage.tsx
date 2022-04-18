import { useNavigate } from "react-router-dom";
import PageButton from "../ui-components/PageButton";
import PageTitle from "../ui-components/PageTitle";
import { ExperimentConfigContext } from "../ExperimentConfigContext";
import { useContext, useEffect } from "react";

const IntroPage: React.FC<{}> = () => {
  const contextValue = useContext(ExperimentConfigContext);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/chat-sessions");
  }

  // TODO: Find a better way to redirect to "/entry" if the token is not set
  useEffect(() => {
    if (!contextValue?.experimentConfig) navigate("/entry");
  });

  const intro = contextValue?.experimentConfig?.intro || {
    title: "",
    body: "",
    start_button_label: "",
  };

  return (
    <>
      <PageTitle>{intro.title}</PageTitle>
      <p className="whitespace-pre-wrap">{intro.body}</p>
      <PageButton type="primary" handleClick={handleClick}>
        {intro.start_button_label}
      </PageButton>
    </>
  );
};

export default IntroPage;
