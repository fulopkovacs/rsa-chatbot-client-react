import Avatar from "../ui-components/chat/Avatar";
import ChatMessage from "../ui-components/chat/ChatMessage";
import { useEffect, useState } from "react";
// TODO: ure real data
import {
  generateShapeData,
  IChatMessages,
  IShapeColors,
  IShapesShape,
} from "../mockData";
import React from "react";
import MessageFrame from "../ui-components/chat/MessageFrame";
import PageButton from "../ui-components/PageButton";
import type { ISessionMessage, IAction } from "../pages/ChatSessionsPage";

const text = {
  goToNextChatSession: "Tovább",
};

/**
 * Properties of the `Chat` component
 *
 * @param messages - The configuration of the current chat session
 * @param goToNextChatSession - A function to start the next chat session
 * @param sessionIndex - Index of the current session in the experiment's config
 * @param dispatch - Dispatch function to update the value of the sessions' history
 */
interface IChatProps {
  messages: IChatMessages;
  goToNextChatSession: () => void;
  sessionIndex: number;
  dispatch: React.Dispatch<IAction>;
}

const Chat: React.FC<IChatProps> = ({
  messages,
  goToNextChatSession,
  sessionIndex,
  dispatch,
}) => {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<IChatMessages>([]);
  const [nextMessage, setNextMessage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      // wait for a bit and display message after that
      const currentDisplayedMessageIndex = nextMessage;
      setDisplayedMessages(messages.slice(0, currentDisplayedMessageIndex + 1));
      if (currentDisplayedMessageIndex < activeMessageIndex) {
        setNextMessage(currentDisplayedMessageIndex + 1);
      }
    }, 700);
  }, [nextMessage]);

  // TODO: this solutions with the `selectedShapeIndex` looks very hacky
  /**
   * Steps to the next user message
   *
   * @param selectedShapeIndex - the index of the selected shape
   *
   */
  function stepToNextUserMessage(selectedShapeIndex?: number | null) {
    let updatedActiveMessageIndex = activeMessageIndex;

    const currentMessageData = messages[activeMessageIndex];
    for (let i = activeMessageIndex + 1; i < messages.length; i++) {
      if (messages[i].sender === "user") {
        updatedActiveMessageIndex = i;
        break;
      }
    }

    if (currentMessageData.sender === "user") {
      const sessionMessage: ISessionMessage = {};
      if ("message" in currentMessageData) {
        sessionMessage.message = currentMessageData.message;
      }
      if ("shapes" in currentMessageData) {
        sessionMessage.shapeOptions = currentMessageData.shapes;
      }
      if (selectedShapeIndex) {
        sessionMessage.selectedShape = selectedShapeIndex;
      }

      // update the session history
      dispatch({
        type: "updateSession",
        sessionIndex,
        sessionMessage,
      });
    }
    setDisplayedMessages(messages.slice(0, activeMessageIndex + 1));
    setNextMessage(activeMessageIndex + 1);
    setActiveMessageIndex(updatedActiveMessageIndex);
  }

  useEffect(() => {
    stepToNextUserMessage();
  }, []);

  /**
   * Send the user's message
   */

  const messageComponents = displayedMessages
    ? displayedMessages.map((messageData, i) => {
        const { sender } = messageData;

        if (
          "button_label" in messageData &&
          i !== displayedMessages.length - 1
        ) {
          messageData.button_label = undefined;
        }

        return (
          <React.Fragment key={i}>
            <ChatMessage
              messageData={messageData}
              stepToNextUserMessage={stepToNextUserMessage}
            />
            {((i === 0 && messages.length === 1) || // There's only one message
              i + 1 === messages.length || // This is the last message
              sender !== messages[i + 1].sender) && ( // The next message is from another sender
              <Avatar type={sender} />
            )}
          </React.Fragment>
        );
      })
    : [];

  return (
    <MessageFrame displayedMessagesNr={displayedMessages.length}>
      {messageComponents}
      {displayedMessages.length === messages.length && (
        <PageButton type="primary" handleClick={goToNextChatSession}>
          {text.goToNextChatSession}
        </PageButton>
      )}
    </MessageFrame>
  );
};

export default Chat;
