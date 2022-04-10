import Button from "./Button";
import type { IButtonProps } from "./Button";

/**
 * A button that is horizontally centered relative to its parent.
 *
 * @param props: The props of the button
 *
 * @see {@link Button}
 */
const PageButton: React.FC<IButtonProps> = (props) => {
  return (
    <div className="flex justify-center">
      <Button {...props} />
    </div>
  );
};

export default PageButton;
