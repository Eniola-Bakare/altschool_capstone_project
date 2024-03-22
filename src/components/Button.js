import { jsx as _jsx } from "react/jsx-runtime";
function Button({ name, onClick, type, width }) {
    if (type === "primary")
        return (_jsx("button", { onClick: onClick, className: width
                ? `${width} h-[56px] py-2 px-4 bg-blue border-2 border-blue text-white rounded-lg font-bold`
                : "w-[157px] py-2 px-4 bg-blue border-2 border-blue text-white rounded-lg font-bold", children: name }));
    return (_jsx("button", { onClick: onClick, className: "w-[157px] py-2 px-4 bg-white border-2 border-blue text-black rounded-lg font-bold", children: name }));
}
export default Button;
