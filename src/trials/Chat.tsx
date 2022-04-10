import Avatar from "../ui-components/chat/Avatar";
import ChatMessage from "../ui-components/chat/ChatMessage";

const Chat: React.FC<{}> = ({}) => {
  return (
    <>
      <h1>Chat</h1>
      <ChatMessage
        type="bot"
        message="Hello, I'm a bot. This should be a very long message, because I want to see how a long message is displayed. Yes, it is very important!"
      />
      <Avatar type="bot" />
      <ChatMessage type="user" message="Okay. I'm a user." />
      <Avatar type="user" />
    </>
  );
};

export default Chat;
