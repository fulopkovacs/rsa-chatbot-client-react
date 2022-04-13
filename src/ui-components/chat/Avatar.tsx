import botHeadUrl from "../../img/bot-head.svg";

const text = {
  userAvatarName: "Ön",
};

interface IAvatarProps {
  type: "user" | "bot";
}

/**
 * An avatar for the user or the bot in a circle-shaped container.
 *
 * @param type - Can be "bot" or "user"
 */
const Avatar: React.FC<IAvatarProps> = ({ type }) => {
  const colors = type === "bot" ? "bg-gray-200" : "bg-green-500 text-white";

  return (
    <div className={type === "bot" ? "flex justify-end" : ""}>
      <div
        className={`rounded-full w-16 h-16 flex items-center justify-center ${colors} mx-6 mb-8`}
      >
        {type === "bot" ? (
          <img src={botHeadUrl} className="p-3" />
        ) : (
          <span className="block text-lg uppercase font-bold">
            {text.userAvatarName}
          </span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
