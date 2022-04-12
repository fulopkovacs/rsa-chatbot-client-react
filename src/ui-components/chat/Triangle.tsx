const Triangle: React.FC<{ fillColor: string }> = ({ fillColor }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="0,15 30,30 30,0" fill={fillColor} />
    </svg>
  );
};

export default Triangle;
