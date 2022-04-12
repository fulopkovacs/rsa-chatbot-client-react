import Button from "../Button";

interface IChatMessageProps {
  message?: string;
  type: "bot" | "user";
  buttonLabel?: string;
  buttonFn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ChatMessage: React.FC<IChatMessageProps> = ({
  message,
  type,
  buttonLabel,
  buttonFn,
}) => {
  const commonProps =
    "rounded-lg max-w-sm mb-5 px-5 py-6 mx-6 animate-fade-in-bottom font-mono";
  return type === "bot" ? (
    <div className="flex justify-end">
      <div
        className={`${commonProps} bg-gray-200`}
        style={{ width: "max-content" }}
      >
        <p className="w-auto">{message}</p>
      </div>
    </div>
  ) : (
    <div>
      <div
        className={`${commonProps} bg-green-500 text-white`}
        style={{ width: "max-content" }}
      >
        <p className="w-auto">{message}</p>
        {buttonLabel && (
          <Button handleClick={buttonFn} type="secondary">
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
