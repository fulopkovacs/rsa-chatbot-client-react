// interface IShapeProps {
//   shape: "triangle" | "circle" | "square";
//   fillColor: "blue" | "green";
//   strokeColor?: "blue" | "green";
// }

const Shape: React.FC<{}> = ({ children }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default Shape;
