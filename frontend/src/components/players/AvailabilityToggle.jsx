export default function AvailabilityToggle({

    checked,

    onChange,

}) {

    return (

        <button
            onClick={onChange}
            className={`
                relative
                h-7
                w-14
                rounded-full
                transition-all
                duration-300

                ${
                    checked
                        ? "bg-emerald-500"
                        : "bg-slate-600"
                }
            `}
        >

            <span
                className={`
                    absolute
                    top-0.5
                    left-0.5

                    h-6
                    w-6
                    rounded-full
                    bg-white
                    transition-transform

                    ${
                        checked
                            ? "translate-x-7"
                            : ""
                    }
                `}
            />

        </button>

    );

}