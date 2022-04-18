import ChatSessionIntro from "../trials/ChatSessionIntro";
import Chat from "../trials/Chat";
import { IShapes } from "../mockData";
import { useState, useContext, useReducer, useEffect } from "react";
import { ExperimentConfigContext } from "../ExperimentConfigContext";
import type { IValue } from "../ExperimentConfigContext";
import { useNavigate } from "react-router-dom";

/**
 * The user's message + relevant info
 *
 * @param  message - The text sent by the user
 * @param selectedShape - Shape selected by the user
 * @param botMessage - Text of the bot's message
 * @param shapeOptions - Possible shapes to select from (color + shape)
 */
export interface ISessionMessage {
  message?: string;
  selectedShape?: number;
  botMessage?: string;
  shapeOptions?: IShapes;
}

/**
 * The user's messages + relevant info that belong to one session.
 */
export type ISessionHistory = ISessionMessage[];

/**
 * The user's messages + relevant info in all the sessions.
 */
export type ISessionsHistory = ISessionHistory[];

export interface IAction {
  type: "updateSession";
  sessionIndex: number;
  sessionMessage: ISessionMessage;
}

function reducer(state: ISessionsHistory, action: IAction) {
  const { type, sessionIndex, sessionMessage } = action;

  if (type === "updateSession") {
    // Create a new session history if it doesn't exist
    if (state.length - 1 < sessionIndex) {
      state.push([]);
    }

    // Push the message data to the session history
    state[sessionIndex].push(sessionMessage);

    return state;
  } else {
    console.error(`Uknown action type: ${action.type}`);
    return state;
  }
}

const ChatSessionsPage: React.FC<{}> = () => {
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [sessionsHistory, dispatch] = useReducer(reducer, []);

  const navigate = useNavigate();

  // TODO: Read the message data from the config
  const contextValue = useContext(ExperimentConfigContext) as IValue;
  const { experimentConfig } = contextValue;
  const sessions = experimentConfig?.sessions;

  useEffect(() => {
    if (!sessions) navigate("/entry");
  });

  /**
   * Start the chat.
   */
  function startChatSession() {
    // Hide the trial's intro and start the chat
    setIntroVisible(false);
  }

  /**
   * Step to  the next chat session or go to the outro page
   * if there are no sessions left.
   */
  function goToNextChatSession() {
    // TODO: Remove this return statement and validate on the route level
    if (!sessions) return;
    // TODO: Make the button disabled if the user can't go to the next session
    if (
      sessions[activeSessionIndex].messages.filter((m) => m.sender === "user")
        .length === sessionsHistory[activeSessionIndex]?.length
    ) {
      const nextSessionIndex = activeSessionIndex + 1;
      if (nextSessionIndex > sessions.length - 1) {
        // TODO: Maybe send the data here?
        navigate("/outro");
      } else {
        setIntroVisible(true);
        setActiveSessionIndex(nextSessionIndex);
      }
    }
  }

  return (
    <>
      {experimentConfig && sessions && (
        <>
          {introVisible ? (
            <ChatSessionIntro
              bot_image={sessions[activeSessionIndex]?.intro?.bot_image}
              text={sessions[activeSessionIndex]?.intro?.text}
              button_label={sessions[activeSessionIndex]?.intro?.button_label}
              sessionIndex={activeSessionIndex}
              startChatting={startChatSession}
            />
          ) : (
            <Chat
              messages={sessions[activeSessionIndex].messages}
              goToNextChatSession={goToNextChatSession}
              dispatch={dispatch}
              sessionIndex={activeSessionIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default ChatSessionsPage;
