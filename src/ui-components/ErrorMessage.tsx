import IconAlertSVG from "../icons/IconAlertSVG";

interface IErrorMessage {
  type: "dark" | "light";
}

const ErrorMessage: React.FC<IErrorMessage> = ({ type, children }) => {
  const colors = {
    red_500: "rgba(239, 68, 68, 1)",
    white: "#ffffff",
  };
  return (
    <div className="flex flex-col justify-center">
      {type === "light" ? (
        <p className="flex items-center text-red-500 pt-2">
          <span className="min-w-min pr-2">
            <IconAlertSVG
              stroke={colors.red_500}
              fill={colors.red_500}
              size={30}
            />
          </span>
          {children}
        </p>
      ) : (
        <p className="flex items-center text-white">
          <span className="min-w-min pr-2">
            <IconAlertSVG stroke={colors.white} fill={colors.white} size={30} />
          </span>
          {children}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
