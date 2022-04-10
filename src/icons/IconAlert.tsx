interface IIconAlertProps {
  stroke: string;
  fill: string;
}

const IconAlert: React.FC<IIconAlertProps> = ({ stroke, fill }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 7.938 7.938"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{ fill }}
        d="M4.156 5.326h-.403l-.031-2.52h.467Zm-.451.767q0-.109.065-.181.067-.075.198-.075.13 0 .197.075.068.072.068.18 0 .109-.068.181-.067.07-.197.07t-.198-.07q-.065-.072-.065-.18z"
      />
      <path
        style={{
          stroke,
          fill: "none",
          strokeWidth: "1.07",
          strokeLinecap: "round",
        }}
        transform="matrix(.42825 0 0 .42825 1.98 3.007)"
        d="M12.67 9.465H-3.385L4.642-4.44z"
      />
    </svg>
  );
};

export default IconAlert;
