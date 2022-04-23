/**
 * The chatbot's message.
 *
 * @param sender - Type of the sender
 * @param message - Text of the message
 */
export interface IBotMessage {
  sender: "bot";
  message?: string;
}

/**
 * Possible colors of the shapes
 */
export type IShapeColors = "blue" | "green";

/**
 * Possible shapes of the geometric shapes
 */
export type IShapesShape = "square" | "circle" | "triangle";

/**
 * A geometric shape represented as an object
 *
 * @param fill_color - Fill color of the shape
 * @param stroke_color - Stroke color of the shape
 * @param shape - Shape of the geomteric shape
 */
export interface IShapeObject {
  fill_color: IShapeColors;
  stroke_color?: IShapeColors;
  shape: "triangle" | "circle" | "square";
}

/**
 * A geometric shape represented as a string
 */
export type IShapeString =
  | "square.blue"
  | "square.green"
  | "circle.blue"
  | "circle.green"
  | "triangle.blue"
  | "triangle.green";

/**
 * The user's message.
 *
 * @param sender - Type of the sender
 * @param message - Text of the message
 * @param button_label - Label of the button
 * @param select_shape - A Shape selector input
 * @param shapes - Id of the trial
 */
export interface IUserMessage {
  sender: "user";
  message?: string;
  button_label: string;
  select_shape?: boolean;
  shapes?: IShapeString[];
}

/*
 * Generate data for a shape.
 *
 * @param shape - Shape of the geometric shape
 * @param color - Color of the shape
 *
 */
export const generateShapeData = (
  shape: "square" | "circle" | "triangle",
  color: IShapeColors
) => ({ shape: shape, fill_color: color });

export type IChatMessages = (IBotMessage | IUserMessage)[];
export const chatData: IChatMessages = [
  {
    sender: "bot",
    message:
      "Szia, én egy robot vagyok. Kaptam egy képet amin meg volt jelölve egy alakzat. A következő üzenetben egy mondattal megpróbálom leírni, neked meg majd ki kéne találni, hogy melyikre gondoltam.",
  },
  {
    sender: "user",
    message: "Készen állok.",
    button_label: "Küldés",
  },
  {
    sender: "bot",
    message: "A kör kék.",
  },
  {
    sender: "bot",
    message: "Melyikre gondolhattam?",
  },
  {
    sender: "user",
    button_label: "Küldés",
    select_shape: true,
    shapes: ["square.blue", "circle.blue", "square.green", "square.blue"],
  },
  {
    sender: "bot",
    message: "Akár erre is gondolhattam volna.",
  },
  {
    sender: "bot",
    message: "A háromszög zöld.",
  },
  {
    sender: "user",
    button_label: "Küldés",
    select_shape: true,
    shapes: ["circle.green", "square.blue", "circle.blue"],
  },
];
// TODO: do not use this data when the API endpoints are ready
export type IExperimentConfig = typeof experimentConfig;
// export type IExperimentConfig = typeof experimentConfig & {token:string};
export const experimentConfig = {
  condition: 1,
  intro: {
    title: "Üdvözöljük a kísérletben!",
    body: `
Tisztelt Résztvevő!

Ebben a kísérletben egy chatbottal való beszélgetésre hívjuk meg Önt. A chatbot és Ön egy játékot fog játszani melyben az egyik fél megpróbál leírni egy dolgot, a másik fél pedig kitalálni azt. Több helyzet is lehet, a pontos szabályokat mindig az adott helyzet előtt ismertetjük.

Az Ön és a chatbot által adott válaszokat anonimizálva mentjük el. Az adatokat Kovács Fülöp, a Budapest Műszaki Egyetem Számítógépes és Kognitív Idegtudományok MSC
szakra járó hallgatója fogja felhasználni szakdolgozatában.

A kísérlet körülbelül 15 percet vesz igénybe.

Jelentkezését köszönjünk, kérjük nyomja meg a lent látható "START" gombot, amennyiben részt szeretne venni a  kísérletben, ellenkező esetben pedig zárja be ezt a böngészőlapot!
  `,
    start_button_label: "START",
  },
  sessions: [
    {
      intro: {
        title: 'Bemutatkozik a bot',
        bot_image: true,
        text: `
        Ezekben a kísérletekben ezzel a chatbottal fog beszélgetni.

          A chatbot a határozott/határozatlan névelőket nem nagyon ismeri...
          `,
        button_label: "Tovább",
      },
      messages: chatData,
    },
    {
      intro: {
        bot_image: false,
        text: `
        A következő beszélgetésben a chatbot már nem fog tudni visszajelzéseket adni.
          `,
        button_label: "Tovább",
      },
      messages: chatData,
    },
  ],
  outro: {
    title: "Köszönjük a részvételt!",
    body: "Az adatokat elmentettük, most már be lehet zárni ezt a böngészőlapot.",
  },
};
