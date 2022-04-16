import ChatSessionIntro from "../trials/ChatSessionIntro";
import Chat from "../trials/Chat";
import { trialsData } from "../mockData";
import { useState } from "react";

const ChatSessionsPage: React.FC<{}> = () => {
  const [activeCondition, setActiveCondition] = useState(1);
  const [introVisible, setIntroVisible] = useState(true);

  function startChatting() {
    // Hide the trial's intro and start the chat
    setIntroVisible(false);
  }

  function nextCondition() {
    // Step to next condition
    setIntroVisible(true);
    setActiveCondition(activeCondition + 1);
  }

  return (
    <>
      {introVisible ? (
        <ChatSessionIntro
          bot_image={trialsData[activeCondition - 1]?.intro?.bot_image}
          text={trialsData[activeCondition - 1]?.intro?.text}
          button_label={trialsData[activeCondition - 1]?.intro?.button_label}
          condition={activeCondition}
          startChatting={startChatting}
        />
      ) : (
        <Chat />
      )}
    </>
  );
};

export default ChatSessionsPage;
