const Circle: React.FC<{ fillColor: string }> = ({ fillColor }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="15" fill={fillColor} />
    </svg>
  );
};

export default Circle;
