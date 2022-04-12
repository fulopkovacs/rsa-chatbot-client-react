import { useContext, useState } from "react";
import PageButton from "../ui-components/PageButton";
import ErrorMessage from "../ui-components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { ExperimentConfigContext, IValue } from "../ExperimentConfigContext";
import PageTitle from "../ui-components/PageTitle";
import { chatData } from "../mockData";

const text = {
  instruction: "Kérjük adja meg a kísérlethez kapott kódot!",
  inputLabel: "Kód",
  submitButtonLabel: "Küldés",
  errorMessage: "A megadott kód érvénytelen. Kérjük adj meg egy másikat!",
};

function AuthPage() {
  const [accessCode, setAcessCode] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const contextValue = useContext(ExperimentConfigContext) as IValue;
  const { setExperimentConfig } = contextValue;

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAcessCode(e.target.value);
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    // Show the error message if the code field is empty
    if (!accessCode) return setErrorMessageVisible(true);

    // TODO: Try to load the config that belongs to the code
    let err = false;
    if (err) {
      setErrorMessageVisible(true);
    } else {
      // 1. set config
      setExperimentConfig({ conditions: 3, messages: chatData });
      // 2. redirect to intro
      navigate("/intro");
    }
  }

  return (
    <>
      <PageTitle>{text.instruction}</PageTitle>
      <form className="flex flex-col w-80 max-w-full px-2 block m-auto items-center">
        <input
          type="text"
          value={accessCode}
          name="access_code"
          onChange={(e) => handleChange(e)}
          autoFocus
          className={`border-2 ${
            errorMessageVisible ? "border-red-500" : "border-gray-300"
          } bg-white text-gray-900 appearance-none block w-full rounded-md py-3 px-4 focus:border-green-500 focus:outline-none text-center text-xl text-green-500`}
        />
        {errorMessageVisible && (
          <ErrorMessage type="light">{text.errorMessage}</ErrorMessage>
        )}
        <PageButton type="primary" handleClick={handleSubmit}>
          {text.submitButtonLabel}
        </PageButton>
      </form>
    </>
  );
}

export default AuthPage;
