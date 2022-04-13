import type { IShapes } from "../../mockData";
import Button from "../Button";
import Circle from "./Circle";
import Square from "./Square";
import Triangle from "./Triangle";

/*
 * TODO:
 * Use `IBotMessagProps` and `IUserMessageProps`
 * to compose `IChatMessageProps`
 */
interface IChatMessageProps {
  message?: string;
  type: "bot" | "user";
  buttonLabel?: string;
  buttonFn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  shapes?: IShapes;
}

interface IBotMessageProps {
  commonProps: string;
  message?: string;
}

interface IUserMessageProps {
  commonProps: string;
  message?: string;
  buttonLabel?: string;
  buttonFn?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  shapes?: IShapes;
}

const BotMessage: React.FC<IBotMessageProps> = ({ message, commonProps }) => {
  return (
    <div className="flex justify-end">
      <div className={`${commonProps} bg-gray-200`}>
        <p className="w-auto">{message}</p>
      </div>
    </div>
  );
};

const UserMessage: React.FC<IUserMessageProps> = ({
  message,
  buttonLabel,
  buttonFn,
  commonProps,
  shapes,
}) => {
  return (
    <div className={`${commonProps} bg-green-500 text-white`}>
      <p className="w-auto">{message}</p>
      {shapes &&
        shapes.map((shapeData, i) => {
          if (shapeData.shape === "square")
            return <Square key={i} fillColor={shapeData.fill_color} />;
          if (shapeData.shape === "circle")
            return <Circle key={i} fillColor={shapeData.fill_color} />;
          if (shapeData.shape === "triangle")
            return <Triangle key={i} fillColor={shapeData.fill_color} />;
        })}
      {buttonLabel && buttonFn && (
        <Button handleClick={buttonFn} type="secondary">
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};

const ChatMessage: React.FC<IChatMessageProps> = ({
  message,
  type,
  buttonLabel,
  buttonFn,
  shapes,
}) => {
  const commonProps =
    "rounded-lg max-w-sm mb-5 px-5 py-6 mx-6 animate-fade-in-bottom font-mono w-max";
  return type === "bot" ? (
    <BotMessage message={message} commonProps={commonProps} />
  ) : (
    <UserMessage
      message={message}
      buttonLabel={buttonLabel}
      buttonFn={buttonFn}
      commonProps={commonProps}
      shapes={shapes}
    />
  );
};

export default ChatMessage;
