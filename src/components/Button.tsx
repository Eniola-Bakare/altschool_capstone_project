import { ReactElement } from "react";

type ButtonProps = {
  name: string;
  onClick?: () => void;
  type: "primary" | "secondary";
  width?: string;
  disabled: boolean;
  height?: string;
};
function Button({
  name,
  onClick,
  type,
  width,
  disabled,
}: ButtonProps): ReactElement {
  if (type === "primary")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={
          width
            ? `${width} ${
                disabled ? "cursor-not-allowed" : " cursor-pointer"
              } h-[56px] py-2 px-4 bg-blue border-2 border-blue text-white rounded-lg font-bold`
            : `${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              } w-[157px] py-2 px-4 bg-blue border-2 border-blue text-white rounded-lg font-bold`
        }
      >
        {name}
      </button>
    );
  return (
    <button
      onClick={onClick}
      // className="w-[157px] py-2 px-4 bg-white border-2 border-blue text-black rounded-lg font-bold"
      className={
        width
          ? `${width} ${
              disabled ? "cursor-not-allowed" : " cursor-pointer"
            } h-[56px] py-2 px-4 bg-white border-2 border-blue text-black rounded-lg font-bold`
          : `${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            } w-[157px] py-2 px-4 bg-white border-2 border-blue text-black rounded-lg font-bold`
      }
    >
      {name}
    </button>
  );
}

export default Button;
