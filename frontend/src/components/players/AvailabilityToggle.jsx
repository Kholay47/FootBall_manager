export default function AvailabilityToggle({

    checked,

    onChange,

}) {

    return (

        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`
                group
                relative
                inline-flex
                h-8
                w-14
                items-center
                rounded-full
                border
                transition-all
                duration-300
                ease-in-out
                focus:outline-none
                focus:ring-2
                focus:ring-emerald-400
                focus:ring-offset-2
                focus:ring-offset-slate-900
                active:scale-95

                ${
                    checked
                        ? "border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/40"
                        : "border-slate-600 bg-slate-700"
                }
            `}
        >

            {/* Knob */}

            <span
                className={`
                    absolute
                    left-1
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-md
                    transition-all
                    duration-300
                    ease-in-out
                    group-hover:scale-110

                    ${
                        checked
                            ? "translate-x-6"
                            : "translate-x-0"
                    }
                `}
            >

                <span
                    className={`
                        h-2
                        w-2
                        rounded-full
                        transition-all
                        duration-300

                        ${
                            checked
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                        }
                    `}
                />

            </span>

        </button>

    );

}