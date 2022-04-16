/*
 * The geometric shapes that are used as stimuli.
 */

export const SquareSVG: React.FC<{ fillColor: string; size: number }> = ({
  fillColor,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} fill={fillColor} />
    </svg>
  );
};

export const CircleSVG: React.FC<{ fillColor: string; size: number }> = ({
  fillColor,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={fillColor} />
    </svg>
  );
};

export const TriangleSVG: React.FC<{ fillColor: string; size: number }> = ({
  fillColor,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={`0,${size / 2} ${size},${size} ${size},0`}
        fill={fillColor}
      />
    </svg>
  );
};

export default TriangleSVG;
