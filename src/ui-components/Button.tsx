export interface IButtonProps {
  type: "primary" | "secondary";
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

/**
 * A button
 *
 * @param props: The props of the button
 *
 * @remarks
 *
 * @see {@link PageButton} for a button that is horizontally centered relative to its parent.
 */
const Button: React.FC<IButtonProps> = ({
  type,
  handleClick,
  children,
  disabled = false,
}) => {
  const commonStyleProps =
    "py-2 text-lg uppercase font-bold rounded-full w-48 min-w-min mt-4";

  return type === "primary" ? (
    <button
      onClick={handleClick}
      className={`${commonStyleProps} bg-green-500 text-white  ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-green-600 active:bg-green-700 cursor-pointer"
      }`}
      // className="py-2 text-lg uppercase font-bold rounded-full bg-green-500  w-48 min-w-min mt-4 cursor-pointer hover:bg-green-600 active:bg-green-700 text-white"
      disabled={disabled}
    >
      {children}
    </button>
  ) : (
    <button
      onClick={handleClick}
      className={`${commonStyleProps} bg-green-500 border-current border-2 text-white  ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-green-600 active:bg-green-700 cursor-pointer"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
