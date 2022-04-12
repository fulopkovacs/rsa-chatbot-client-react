const Square: React.FC<{ fillColor: string }> = ({ fillColor }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="30" fill={fillColor} />
    </svg>
  );
};

export default Square;
