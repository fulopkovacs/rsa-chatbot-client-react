import type { IShapes } from "../../mockData";
import Button from "../Button";
import { Square, Circle, Triangle } from "./Shapes";

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

const ShapeSelector: React.FC<{ shapes: IShapes }> = ({ shapes }) => {
  const size = 50;
  return (
    <div className="flex flex-wrap gap-5 bg-white p-2 rounded-md">
      {shapes.map((shapeData, i) => {
        if (shapeData.shape === "square")
          return (
            <Square key={i} fillColor={shapeData.fill_color} size={size} />
          );
        if (shapeData.shape === "circle")
          return (
            <Circle key={i} fillColor={shapeData.fill_color} size={size} />
          );
        if (shapeData.shape === "triangle")
          return (
            <Triangle key={i} fillColor={shapeData.fill_color} size={size} />
          );
      })}
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
      {shapes && <ShapeSelector shapes={shapes} />}
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
    "rounded-lg max-w-full mb-5 px-5 py-6 animate-fade-in-bottom font-mono w-max";
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
