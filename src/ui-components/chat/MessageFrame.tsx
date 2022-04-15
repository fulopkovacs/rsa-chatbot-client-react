import { useEffect, useRef } from "react";
import PageWithBreakpoints from "../PageWithBreakpoints";

interface IMessageFrameProps {
  displayedMessagesNr: number;
}

/**
 * A container for the chat messages.
 *
 * @remarks
 * Responsible for making sure that the newest messages are
 * always visible on the bottom.
 */
const MessageFrame: React.FC<IMessageFrameProps> = ({
  children,
  displayedMessagesNr,
}) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    /**
     * Scroll to the bottom of the page.
     *
     * @remarks
     * Used to make sure that the most recent message (that is always
     * on the bottom) is visible.
     */
    function scrollToBottom() {
      if (parentRef.current && childRef.current) {
        const parentDiv = parentRef.current as HTMLDivElement;
        const childDiv = childRef.current as HTMLDivElement;
        parentDiv.scroll({ top: childDiv.scrollHeight, behavior: "smooth" });
      }
    }

    scrollToBottom();
  }, [childRef, parentRef, displayedMessagesNr]);

  return (
    <div
      ref={parentRef}
      className="fixed left-0 top-0 bottom-0 right-0 h-full overflow-auto"
    >
      <div ref={childRef} className="pt-9 px-5">
        <PageWithBreakpoints>{children}</PageWithBreakpoints>
      </div>
    </div>
  );
};

export default MessageFrame;
