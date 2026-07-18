import {
    FaFutbol,
    FaSpinner,
} from "react-icons/fa";

import Button from "../common/Button";

export default function GenerateButton({

    loading,

    onGenerate,

    disabled = false,

}) {

    return (

        <div className="my-12 flex flex-col items-center gap-4">

            <Button
                onClick={onGenerate}
                disabled={loading || disabled}
                className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-emerald-500
                    via-emerald-600
                    to-green-600
                    px-10
                    py-4
                    text-lg
                    font-semibold
                    shadow-lg
                    shadow-emerald-500/20
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-emerald-500/40
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
            >

                {loading ? (

                    <FaSpinner
                        className="animate-spin text-xl"
                    />

                ) : (

                    <FaFutbol
                        className="
                            text-xl
                            transition-transform
                            duration-300
                            group-hover:rotate-180
                        "
                    />

                )}

                {loading
                    ? "Generating Teams..."
                    : "Generate Balanced Teams"}

            </Button>

            <p className="text-center text-sm text-slate-400">

                Create two balanced football teams based on
                player tier and ranking.

            </p>

        </div>

    );

}