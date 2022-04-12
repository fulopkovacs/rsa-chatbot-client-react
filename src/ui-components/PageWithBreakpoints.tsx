/**
 * A component that makes sure that its children
 * respect the page's breakpoins.
 *
 * @remarks
 * Useful for texts, etc...
 */
const PageWithBreakpoints: React.FC<{}> = ({ children }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-xl mx-6">{children}</div>{" "}
    </div>
  );
};

export default PageWithBreakpoints;
