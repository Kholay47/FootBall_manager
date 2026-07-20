export default function Badge({
    children,
    color = "emerald",
}) {
    const colors = {
        emerald: "bg-emerald-500",

        blue: "bg-sky-500",

        yellow: "bg-amber-500",

        red: "bg-red-500",

        gray: "bg-slate-600",
    };

    return (
        <span
            className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                text-white
                ${colors[color]}
            `}
        >
            {children}
        </span>
    );
}