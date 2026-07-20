export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
}) {
    const variants = {
        primary:
            "bg-emerald-600 hover:bg-emerald-500 text-white",

        secondary:
            "bg-sky-600 hover:bg-sky-500 text-white",

        danger:
            "bg-red-600 hover:bg-red-500 text-white",

        outline:
            "border border-slate-700 bg-transparent hover:bg-slate-800 text-white",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-5
                py-2.5
                font-medium
                transition-all
                duration-200
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}