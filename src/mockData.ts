// TODO: do not use this data when the API endpoints are ready
export const trialsData = [
  {
    condition: 1,
    intro: {
      bot_image: true,
      text: `
Ezekben a kísérletekben ezzel a chatbottal fog beszélgetni.

A chatbot a határozott/határozatlan névelőket nem nagyon ismeri...
      `,
      button_label: "Tovább",
    },
  },
];

/**
 * The chatbot's message.
 *
 * @param sender - Type of the sender
 * @param message - Text of the message
 */
interface IBotMessage {
  sender: "bot";
  message?: string;
}

/**
 * Possible colors of the shapes
 */
type IShapeColors = "blue" | "green";

/**
 * The data of a geometric shape
 *
 * @param fill_color - Fill color of the shape
 * @param stroke_color - Stroke color of the shape
 * @param shape - Shape of the geomteric shape
 */
interface IShape {
  fill_color: IShapeColors;
  stroke_color?: IShapeColors;
  shape: "triangle" | "circle" | "square";
}

/*
 * An array of shapes
 */
type IShapes = IShape[];

/**
 * The user's message.
 *
 * @param sender - Type of the sender
 * @param message - Text of the message
 * @param button_label - Label of the button
 * @param select_shape - A Shape selector input
 * @param shapes - Id of the trial
 */
interface IUserMessage {
  sender: "user";
  message?: string;
  button_label?: string;
  select_shape?: boolean;
  shapes?: IShapes;
}

/*
 * Generate data for a shape.
 *
 * @param shape - Shape of the geometric shape
 * @param color - Color of the shape
 *
 */
const generateShapeData = (
  shape: "square" | "circle" | "triangle",
  color: IShapeColors
) => ({ shape: shape, fill_color: color });

const square = {
  green: generateShapeData("square", "green"),
  blue: generateShapeData("square", "blue"),
};

const circle = {
  green: generateShapeData("circle", "green"),
  blue: generateShapeData("circle", "blue"),
};

const triangle = {
  green: generateShapeData("triangle", "green"),
  blue: generateShapeData("triangle", "blue"),
};

export type IChatMessages = (IBotMessage | IUserMessage)[]
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
    message: "Az kör kék.",
  },
  {
    sender: "bot",
    message: "Melyikre gondolhattam?",
  },
  {
    sender: "user",
    button_label: "Küldés",
    select_shape: true,
    shapes: [square.blue, circle.blue, square.green, square.blue],
  },
  {
    sender: "bot",
    message: "A háromszög zöld.",
  },
  {
    sender: "user",
    button_label: "Küldés",
    select_shape: true,
    shapes: [square.blue, circle.blue, square.green, square.blue],
  },
];
