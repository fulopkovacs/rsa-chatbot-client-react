export interface IButtonProps {
  type: "primary" | "secondary";
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * A button
 *
 * @param props: The props of the button
 *
 * @remarks
 *
 * Check out @see {@link PageButton} for a button that is horizontally centered relative to its parent.
 */
const Button: React.FC<IButtonProps> = ({ type, handleClick, children }) => {
  return type === "primary" ? (
    <button
      onClick={handleClick}
      className="py-2 text-lg uppercase font-bold rounded-full bg-green-500  w-48 min-w-min mt-4 cursor-pointer hover:bg-green-600 active:bg-green-700 text-white"
    >
      {children}
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="py-2 text-lg uppercase font-bold rounded-full bg-green-500  w-48 min-w-min mt-4 cursor-pointer hover:bg-green-600 active:bg-green-700 text-white"
    >
      {children}
    </button>
  );
};

export default Button;
