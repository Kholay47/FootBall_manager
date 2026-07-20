export default function Loader({
    text = "Loading...",
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-10">

            <div
                className="
                    h-12
                    w-12
                    animate-spin
                    rounded-full
                    border-4
                    border-slate-700
                    border-t-emerald-500
                "
            />

            <p className="text-slate-300">
                {text}
            </p>

        </div>
    );
}