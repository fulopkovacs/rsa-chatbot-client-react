import botImageUrl from "../img/bot-illustration.png";
import Button from "../ui-components/Button";
import PageTitle from "../ui-components/PageTitle";

interface TrialIntroProps {
  bot_image: boolean;
  text: string;
  condition: number;
  startChatting: () => void;
  button_label: string;
}

const TrialIntro: React.FC<TrialIntroProps> = ({
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
      <Button type="primary" handleClick={startChatting}>
        {button_label}
      </Button>
    </>
  );
};

export default TrialIntro;
