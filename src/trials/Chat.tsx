import Avatar from "../ui-components/chat/Avatar";
import ChatMessage from "../ui-components/chat/ChatMessage";
import { ExperimentConfigContext } from "../ExperimentConfigContext";
import type { IValue } from "../ExperimentConfigContext";
import { useContext, useEffect, useState } from "react";
// TODO: ure real data
import { chatData } from "../mockData";
import type { IChatMessages } from "../mockData";
import React from "react";
import MessageFrame from "../ui-components/chat/MessageFrame";

/*
 * LOGIC:
 *
 *   * display bot messages with a delay (`delay-150`)
 *   * stop on user messages
 *   * show images with a delay
 *
 */

const Chat: React.FC<{}> = ({}) => {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<IChatMessages>([]);
  const [nextMessage, setNextMessage] = useState(0);

  // TODO: Read the message data from the config
  // const contextValue = useContext(ExperimentConfigContext) as IValue;
  // const { experimentConfig } = contextValue;
  // const messages = experimentConfig?.messages;
  const messages = chatData;

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

  function stepToNextUserMessage() {
    let updatedActiveMessageIndex = activeMessageIndex;

    for (let i = activeMessageIndex + 1; i < messages.length; i++) {
      if (messages[i].sender === "user") {
        updatedActiveMessageIndex = i;
        break;
      }
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
        const message = messageData.message;
        // const button_label =
        //   sender === "user" ? messageData.button_label : undefined;
        let button_label, shapes;
        if (sender === "user") {
          button_label = messageData.button_label;
          shapes = messageData.shapes;
        }

        return (
          <React.Fragment key={i}>
            <ChatMessage
              type={sender}
              message={message}
              buttonLabel={
                // Do not display a button if it's not the last message of the user
                // TODO: Use a proper solution for making the button dissappear
                // after the message is sent.
                i === displayedMessages.length - 1 ? button_label : undefined
              }
              stepToNextUserMessage={stepToNextUserMessage}
              shapes={shapes}
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
    </MessageFrame>
  );
};

export default Chat;
