import botImageUrl from "../img/bot-illustration.png";
import PageButton from "../ui-components/PageButton";
import PageTitle from "../ui-components/PageTitle";

interface IChatSessionIntroProps {
  bot_image: boolean;
  text: string;
  sessionIndex: number;
  startChatting: () => void;
  button_label: string;
}

const ChatSessionIntro: React.FC<IChatSessionIntroProps> = ({
  bot_image,
  text,
  startChatting,
  button_label,
}) => {
  return (
    <>
      <PageTitle>Bemutatkozik a bot</PageTitle>
      {bot_image && (
        <img className="text-center m-auto max-w-xs" src={botImageUrl} />
      )}
      <p className="whitespace-pre-wrap">{text}</p>
      <PageButton type="primary" handleClick={startChatting}>
        {button_label}
      </PageButton>
    </>
  );
};

export default ChatSessionIntro;
