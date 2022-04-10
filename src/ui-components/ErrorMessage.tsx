import IconAlert from "../icons/IconAlert";

interface IErrorMessage {
  type: "dark" | "light";
}

const ErrorMessage: React.FC<IErrorMessage> = ({ type, children }) => {
  const colors = {
    red_500: "rgba(239, 68, 68, 1)",
    white: "#ffffff",
  };
  return type === "light" ? (
    <p className="flex items-start text-red-500 pt-2 ">
      <IconAlert stroke={colors.red_500} fill={colors.red_500} />
      {children}
    </p>
  ) : (
    <p className="flex items-center text-white">
      <IconAlert stroke={colors.white} fill={colors.white} />
      {children}
    </p>
  );
};

export default ErrorMessage;
