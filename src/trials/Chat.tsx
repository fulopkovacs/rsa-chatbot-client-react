import Avatar from "../ui-components/chat/Avatar";
import ChatMessage from "../ui-components/chat/ChatMessage";
import { useEffect, useState } from "react";
import { IAlerts, IBotFeedBack, IBotMessage, IChatMessages } from "../mockData";
import React from "react";
import MessageFrame from "../ui-components/chat/MessageFrame";
import PageButton from "../ui-components/PageButton";
import type {
  ISessionMessage,
  IUpdateSessionHistoryAction,
  IUpdateOriginalMessagesAction,
} from "../pages/ChatSessionsPage";

/**
 * The data that is saved about the current user message
 *
 * @param correct - `true` if the user's answer was correct
 * @param match - `match` if the index matches, `almost_match` if only the features match, `miss` if nothing does
 * @param correct - The correct answer (the index in the case of the shapeSelector)
 */
interface ISavedSessionMessage extends ISessionMessage {
  correct?: boolean;
  match?: "match" | "almost_match" | "miss";
  correct_answer?: number;
}

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
  dispatch: React.Dispatch<
    IUpdateSessionHistoryAction | IUpdateOriginalMessagesAction
  >;
  bot_feedback?: IBotFeedBack;
  next_session_button_label: string;
  alerts: IAlerts;
}

const Chat: React.FC<IChatProps> = ({
  messages,
  goToNextChatSession,
  sessionIndex,
  dispatch,
  bot_feedback,
  next_session_button_label,
  alerts,
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

  // TODO: this solutions with the `userAnswer` is very hacky
  /**
   * Steps to the next user message
   *
   * @param userAnswer - the index of the selected shape
   *
   */
  function stepToNextUserMessage(userAnswer?: number | null) {
    let updatedActiveMessageIndex = activeMessageIndex;

    const currentMessageData = messages[activeMessageIndex];
    for (let i = activeMessageIndex + 1; i < messages.length; i++) {
      if (messages[i].sender === "user") {
        updatedActiveMessageIndex = i;
        break;
      }
    }

    let matchMessage: null | string = null;
    if (currentMessageData.sender === "user") {
      const sessionMessage: ISavedSessionMessage = {};
      if ("message" in currentMessageData) {
        sessionMessage.message = currentMessageData.message;
      }
      if ("shapes" in currentMessageData) {
        sessionMessage.shapeOptions = currentMessageData.shapes;
      }
      if ("two_choices" in currentMessageData) {
        sessionMessage.options = currentMessageData.two_choices;
      }
      if (userAnswer !== null && userAnswer !== undefined) {
        sessionMessage.userAnswer = userAnswer;
        let botAnswer: number;
        // Find the previous bot message that contains
        // a correct answer, and evaluate the user's answer
        for (let i = activeMessageIndex - 1; i > 0; i--) {
          if ("correct_answer" in messages[i]) {
            const msg = messages[i] as IBotMessage;
            botAnswer = msg.correct_answer as number;
            sessionMessage.correct_answer = botAnswer;
            let match: "match" | "almost_match" | "miss";
            if (botAnswer === userAnswer) {
              sessionMessage.correct = true;
              match = "match";
            } else if (
              currentMessageData.shapes &&
              currentMessageData.shapes[botAnswer] ===
                currentMessageData.shapes[userAnswer]
            ) {
              sessionMessage.correct = false;
              match = "almost_match";
            } else {
              sessionMessage.correct = false;
              match = "miss";
            }
            sessionMessage.match = match;
            if (bot_feedback && "messages" in bot_feedback)
              matchMessage = bot_feedback.messages[match];
            break;
          }
        }
      }

      let messageIndex: null | number = null;
      if (matchMessage) {
        // Find the next feedback message
        for (let i = activeMessageIndex + 1; i <= messages.length - 1; i++) {
          const msg = messages[i];
          if (msg.sender === "user") {
            break;
          } else if (msg.feedback) {
            messageIndex = i;
            break;
          }
        }
      }

      // The data of the next bot feedback (if there is one)
      const updateMessageContent = {
        messageIndex,
        newMessageContent: matchMessage,
      };
      // update the session history
      dispatch({
        type: "updateSession",
        sessionIndex,
        sessionMessage,
        ...updateMessageContent,
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
              alerts={alerts}
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
          {next_session_button_label}
        </PageButton>
      )}
    </MessageFrame>
  );
};

export default Chat;
