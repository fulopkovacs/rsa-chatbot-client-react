import { useState } from "react";
import {
  generateShapeData,
  IBotMessage,
  IShapeColors,
  IShapeObject,
  IShapesShape,
  IUserMessage,
} from "../../mockData";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { SquareSVG, CircleSVG, TriangleSVG } from "./Shapes";

const text = {
  shapeNotSelectedAlert: "Válasszon egy formát!",
};

/*
 * TODO:
 * Use `IBotMessagProps` and `IUserMessageProps`
 * to compose `IChatMessageProps`
 */
interface IChatMessageProps {
  messageData: IBotMessage | IUserMessage;
  stepToNextUserMessage: () => void;
}

interface IBotMessageProps {
  commonProps: string;
  messageData: IBotMessage;
}

interface IUserMessageProps {
  commonProps: string;
  stepToNextUserMessage: (selectedShapeIndex?: number | null) => void;
  setSelectedShapeIndex?: () => void;
  messageData: IUserMessage;
}

const BotMessage: React.FC<IBotMessageProps> = ({
  messageData,
  commonProps,
}) => {
  const { message } = messageData;
  return (
    <div className="flex justify-end font-mono">
      <div className={`${commonProps} bg-gray-200`}>
        <p className="w-auto">{message}</p>
      </div>
    </div>
  );
};

const ShapeSelector: React.FC<{
  shapes: IShapeObject[];
  setSelectedShapeValue: React.Dispatch<React.SetStateAction<number | null>>;
  messageSentStatus: boolean;
}> = ({ shapes, setSelectedShapeValue, messageSentStatus }) => {
  const size = 50;

  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );

  function selectShape(shapeIndex: number) {
    // TODO: update the value of the user's message
    // with the index of the selectedShape
    setSelectedShapeValue(shapeIndex);
    setSelectedShapeIndex(shapeIndex);
  }

  return (
    <>
      <div
        className={`flex flex-wrap gap-5 bg-white p-2 rounded-md ${
          messageSentStatus && "opacity-50"
        }`}
      >
        {shapes.map((shapeData, i) => {
          const ShapeSVG =
            shapeData.shape === "square"
              ? SquareSVG
              : shapeData.shape === "circle"
              ? CircleSVG
              : TriangleSVG;

          return (
            <span
              key={i}
              className={`p-1 cursor-pointer ${
                i === selectedShapeIndex && "border-4 border-green-500"
              } ${messageSentStatus && "pointer-events-none"}`}
              onClick={() => selectShape(i)}
            >
              {<ShapeSVG fillColor={shapeData.fill_color} size={size} />}
            </span>
          );
        })}
      </div>
      <span
        className={`m-1 transition-opacity ${
          selectedShapeIndex !== null && "hidden"
        }`}
      >
        <ErrorMessage type="dark">{text.shapeNotSelectedAlert}</ErrorMessage>
      </span>
    </>
  );
};

const UserMessage: React.FC<IUserMessageProps> = ({
  messageData,
  stepToNextUserMessage,
  commonProps,
}) => {
  const { message, shapes, button_label } = messageData;
  const [selectedShapeIndex, setSelectedShapeValue] = useState<number | null>(
    null
  );

  const [messageSentStatus, setMessageSentStatus] = useState(false);

  function submitMessage() {
    // TODO: submit the response to the API
    // get the relevan info from the `ExperimentConfigContext`
    stepToNextUserMessage(selectedShapeIndex);
    setMessageSentStatus(true);
  }

  return (
    <div className={`${commonProps} bg-green-500 text-white transition-all`}>
      <p className="w-auto">{message}</p>
      {shapes && (
        <ShapeSelector
          shapes={shapes.map((shape) => {
            const shapeArgs = shape.split(".") as [IShapesShape, IShapeColors];
            return generateShapeData(...shapeArgs);
          })}
          messageSentStatus={messageSentStatus}
          setSelectedShapeValue={setSelectedShapeValue}
        />
      )}
      {button_label && messageSentStatus === false && (
        <Button
          handleClick={submitMessage}
          type="secondary"
          disabled={shapes && selectedShapeIndex === null ? true : false}
        >
          {button_label}
        </Button>
      )}
    </div>
  );
};

const ChatMessage: React.FC<IChatMessageProps> = ({
  stepToNextUserMessage,
  messageData,
}) => {
  const { sender } = messageData;
  const commonProps =
    "rounded-lg max-w-full mb-5 px-5 py-6 animate-fade-in-bottom w-max";
  return sender === "bot" ? (
    <BotMessage messageData={messageData} commonProps={commonProps} />
  ) : (
    <UserMessage
      messageData={messageData}
      commonProps={commonProps}
      stepToNextUserMessage={stepToNextUserMessage}
    />
  );
};

export default ChatMessage;
