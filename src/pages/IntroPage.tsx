import { useNavigate } from "react-router-dom";
import PageButton from "../ui-components/PageButton";
import PageTitle from "../ui-components/PageTitle";

const text = {
  instructionTitle: "Üdvözöljük a kísérletben!",
  instructionBody: `
Tisztelt Résztvevő!

Ebben a kísérletben egy chatbottal való beszélgetésre hívjuk meg Önt. A chatbot és Ön egy játékot fog játszani melyben az egyik fél megpróbál leírni egy dolgot, a másik fél pedig kitalálni azt. Több helyzet is lehet, a pontos szabályokat mindig az adott helyzet előtt ismertetjük.

Az Ön és a chatbot által adott válaszokat anonimizálva mentjük el. Az adatokat Kovács Fülöp, a Budapest Műszaki Egyetem Számítógépes és Kognitív Idegtudományok MSC
szakra járó hallgatója fogja felhasználni szakdolgozatában.

A kísérlet körülbelül 15 percet vesz igénybe.

Jelentkezését köszönjünk, kérjük nyomja meg a lent látható "START" gombot, amennyiben részt szeretne venni a  kísérletben, ellenkező esetben pedig zárja be ezt a böngészőlapot!
  `,
  startButtonText: "START",
};

const IntroPage: React.FC<{}> = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/trials");
  }

  return (
    <>
      <PageTitle>{text.instructionTitle}</PageTitle>
      <p className="whitespace-pre-wrap">{text.instructionBody}</p>
      <PageButton type="primary" handleClick={handleClick}>
        {text.startButtonText}
      </PageButton>
    </>
  );
};

export default IntroPage;
