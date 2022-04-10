interface IChatMessageProps {
  message: string;
  type: "bot" | "user";
}

const ChatMessage: React.FC<IChatMessageProps> = ({ message, type }) => {
  const colors = type === "bot" ? "bg-gray-200" : "bg-green-500 text-white";
  const fontProps = type === "bot" ? "font-mono" : "";

  return (
    <div className={type === "bot" ? "flex justify-end" : ""}>
      <div
        className={`rounded-lg max-w-sm mb-5 px-5 py-6 mx-6 animate-fade-in-bottom ${colors} ${fontProps}`}
        style={{ width: "max-content" }}
      >
        <p className="w-auto">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
