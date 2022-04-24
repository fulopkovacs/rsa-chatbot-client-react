import { useState } from "react";
import {
  generateShapeData,
  IAlerts,
  IBotMessage,
  IShapeColors,
  IShapeObject,
  IShapesShape,
  IUserMessage,
} from "../../mockData";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { SquareSVG, CircleSVG, TriangleSVG } from "./Shapes";

/*
 * TODO:
 * Use `IBotMessagProps` and `IUserMessageProps`
 * to compose `IChatMessageProps`
 */
interface IChatMessageProps {
  messageData: IBotMessage | IUserMessage;
  stepToNextUserMessage: () => void;
  alerts: IAlerts;
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
  alerts: IAlerts;
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

// TODO: Rename this component... I was out of time when I came up with the name.
const TwoOptionsSelector: React.FC<{
  options: [string, string];
  setUserAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  optionNotSelectedAlert: string;
}> = ({ options, setUserAnswer, optionNotSelectedAlert }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<null | number>(
    null
  );
  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center">
        {options.map((option, i) => (
          <button
            className={`border border-white p-2 ${
              selectedOptionIndex === i && "bg-white text-green-500"
            }`}
            key={i}
            onClick={() => {
              setSelectedOptionIndex(i);
              setUserAnswer(i);
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOptionIndex === null && (
        <ErrorMessage type="dark">{optionNotSelectedAlert}</ErrorMessage>
      )}
    </>
  );
};

const ShapeSelector: React.FC<{
  shapes: IShapeObject[];
  setSelectedShapeValue: React.Dispatch<React.SetStateAction<number | null>>;
  messageSentStatus: boolean;
  shapeNotSelectedAlert: string;
}> = ({
  shapes,
  setSelectedShapeValue,
  messageSentStatus,
  shapeNotSelectedAlert,
}) => {
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
        <ErrorMessage type="dark">{shapeNotSelectedAlert}</ErrorMessage>
      </span>
    </>
  );
};

const UserMessage: React.FC<IUserMessageProps> = ({
  messageData,
  stepToNextUserMessage,
  commonProps,
  alerts,
}) => {
  const { message, shapes, button_label, two_choices } = messageData;
  // TODO: this is not how the data should flow...
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const [messageSentStatus, setMessageSentStatus] = useState(false);

  function submitMessage() {
    // TODO: submit the response to the API
    // get the relevan info from the `ExperimentConfigContext`
    stepToNextUserMessage(userAnswer);
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
          setSelectedShapeValue={setUserAnswer}
          shapeNotSelectedAlert={alerts.shapeNotSelectedAlert}
        />
      )}
      {two_choices && (
        <TwoOptionsSelector
          options={two_choices}
          setUserAnswer={setUserAnswer}
          optionNotSelectedAlert={alerts.optionNotSelectedAlert}
        />
      )}
      {button_label && messageSentStatus === false && (
        <Button
          handleClick={submitMessage}
          type="secondary"
          disabled={shapes && userAnswer === null ? true : false}
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
  alerts,
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
      alerts={alerts}
    />
  );
};

export default ChatMessage;
