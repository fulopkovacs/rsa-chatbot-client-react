import ChatSessionIntro from "../trials/ChatSessionIntro";
import Chat from "../trials/Chat";
import { experimentConfig } from "../mockData";
import { useState, useContext } from "react";
import { ExperimentConfigContext } from "../ExperimentConfigContext";
import type { IValue } from "../ExperimentConfigContext";
import { chatData } from "../mockData";
import type { IChatMessages } from "../mockData";
import { useNavigate } from "react-router-dom";

const ChatSessionsPage: React.FC<{}> = () => {
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);

  const navigate = useNavigate();

  // TODO: Read the message data from the config
  // const contextValue = useContext(ExperimentConfigContext) as IValue;
  // const { experimentConfig } = contextValue;
  // const messages = experimentConfig?.messages;
  const { sessions } = experimentConfig;

  function startChatting() {
    // Hide the trial's intro and start the chat
    setIntroVisible(false);
  }

  function startNextChatSession() {
    const nextSessionIndex = activeSessionIndex + 1;
    if (nextSessionIndex > sessions.length - 1) {
      // TODO: Maybe send the data here?
      navigate("/outro");
    } else {
      setIntroVisible(true);
      setActiveSessionIndex(nextSessionIndex);
    }
  }

  return (
    <>
      {introVisible ? (
        <ChatSessionIntro
          bot_image={sessions[activeSessionIndex]?.intro?.bot_image}
          text={sessions[activeSessionIndex]?.intro?.text}
          button_label={sessions[activeSessionIndex]?.intro?.button_label}
          sessionIndex={activeSessionIndex}
          startChatting={startChatting}
        />
      ) : (
        <Chat
          messages={sessions[activeSessionIndex].messages}
          startNextChatSession={startNextChatSession}
        />
      )}
    </>
  );
};

export default ChatSessionsPage;
