import { FaFutbol } from "react-icons/fa";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 shadow-lg">

                        <FaFutbol
                            className="text-white"
                            size={20}
                        />

                    </div>

                    <div>

                        <h1 className="text-lg font-bold text-white">
                            Football Team Generator
                        </h1>

                        <p className="text-xs text-slate-400">
                            Balanced Team Optimizer
                        </p>

                    </div>

                </div>

                <div className="hidden items-center gap-3 md:flex">

                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">

                        Version 1.0

                    </span>

                </div>

            </div>

        </header>
    );
}