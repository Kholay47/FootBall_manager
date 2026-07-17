import { FaTimes } from "react-icons/fa";

export default function Modal({
    open,
    title,
    children,
    onClose,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

                <div className="flex items-center justify-between border-b border-slate-800 p-5">

                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 transition hover:text-white"
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>
    );
}