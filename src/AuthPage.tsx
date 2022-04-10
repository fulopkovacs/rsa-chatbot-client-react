import { useContext, useState } from "react";
import Button from "./ui-components/Button";
import ErrorMessage from "./ui-components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const text = {
  instruction: "Kérjük adja meg a kísérlethez kapott kódot!",
  inputLabel: "Kód",
  submitButtonLabel: "Küldés",
  errorMessage: "A megadott kód érvénytelen. Kérjük adj meg egy másikat!",
};

export interface IExperimentConfig {
  conditions: number;
}

function AuthPage() {
  const [accessCode, setAcessCode] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAcessCode(e.target.value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    // Show the error message if the code field is empty
    if (accessCode) return setErrorMessageVisible(true);

    // TODO: Try to load the config that belongs to the code
    let err = true;
    if (err) {
      setErrorMessageVisible(true);
    } else {
      // 1. set config
      // 2. redirect to intro
      navigate("/intro");
    }
  }

  return (
    <>
      <div className="text-center">
        <h2 className="w-3/6 m-auto block max-w-full text-2xl font-bold text-green-500 mt-5 md:mt-8">
          {text.instruction}
        </h2>
        <form className="flex flex-col pt-7 md:pt-12 w-80 max-w-full px-2 block m-auto items-center">
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
          <Button type="primary" handleClick={handleSubmit}>
            {text.submitButtonLabel}
          </Button>
        </form>
      </div>
    </>
  );
}

export default AuthPage;
