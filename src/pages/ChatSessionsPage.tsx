import ChatSessionIntro from "../trials/ChatSessionIntro";
import Chat from "../trials/Chat";
import { IShapeString } from "../mockData";
import { useState, useContext, useReducer, useEffect } from "react";
import { ExperimentConfigContext } from "../ExperimentConfigContext";
import type { IValue } from "../ExperimentConfigContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  shapeOptions?: IShapeString[];
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

  switch (type) {
    case "updateSession":
      // Create a new session history if it doesn't exist
      if (state.length - 1 < sessionIndex) {
        state.push([]);
      }

      // Push the message data to the session history
      state[sessionIndex].push(sessionMessage);

      return state;
    default:
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
  }, []);
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
        const access_token = localStorage.getItem("access_token");

        if (access_token) {
          const requestConfig = {
            headers: { Authorization: `Bearer ${access_token}` },
          };
          // TODO: Use an environmental variable for the api config
          let apiBaseUrl: string;

          if (process.env.NODE_ENV === "development") {
            apiBaseUrl = "http://localhost:8000";
          } else {
            apiBaseUrl = "";
          }

          axios
            .post(
              apiBaseUrl + "/chat/user-session",
              {
                sessions: sessionsHistory,
                entry_code: 1 /*doesn't matter, it'll be obtained from the token */,
                condition: experimentConfig.condition,
                timestamp: Date.now(),
              },
              requestConfig
            )
            .then((resp) => {
              console.log(resp.data);
              navigate("/outro");
            })
            .catch((err) => {
              console.error(err);
              navigate("/outro");
            });
        } else {
          console.error("Access token was not found in the localStorage");
          navigate("/outro");
        }
      } else {
        setIntroVisible(true);
        setActiveSessionIndex(nextSessionIndex);
      }
    }
  }

  const title = sessions && sessions[activeSessionIndex].intro?.title;

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
              title={title}
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
