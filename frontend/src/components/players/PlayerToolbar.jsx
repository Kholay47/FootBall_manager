import { useState } from "react";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";

import Button from "../common/Button";

export default function PlayerToolbar({

    search,

    setSearch,

    onAdd,

    totalPlayers = 0,

}) {

    const [focused, setFocused] = useState(false);

    function clearSearch() {

        setSearch("");

    }

    return (

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="flex flex-1 items-center gap-4">

                <div className="relative max-w-md flex-1">

                    <label
                        htmlFor="player-search"
                        className="sr-only"
                    >
                        Search Players
                    </label>

                    <FaSearch
                        className={`
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            transition-colors
                            duration-200

                            ${
                                focused
                                    ? "text-emerald-400"
                                    : "text-slate-400"
                            }
                        `}
                    />

                    <input
                        id="player-search"
                        type="search"
                        autoComplete="off"
                        placeholder="Search players..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        onFocus={() => setFocused(true)}

                        onBlur={() => setFocused(false)}

                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900
                            py-3
                            pl-11
                            pr-11
                            text-white
                            outline-none
                            transition-all
                            duration-300
                            placeholder:text-slate-500
                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-500/20
                        "
                    />

                    {search && (

                        <button
                            type="button"
                            onClick={clearSearch}
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                rounded-full
                                p-1
                                text-slate-400
                                transition
                                hover:bg-slate-700
                                hover:text-white
                            "
                        >

                            <FaTimes size={12} />

                        </button>

                    )}

                </div>

                <span
                    className="
                        hidden
                        rounded-full
                        border
                        border-slate-700
                        bg-slate-900
                        px-4
                        py-2
                        text-sm
                        text-slate-300
                        md:inline-flex
                    "
                >
                    {totalPlayers} Player{totalPlayers !== 1 ? "s" : ""}
                </span>

            </div>

            {/* Add Button */}

            <Button
                onClick={onAdd}
                className="gap-2"
            >

                <FaPlus />

                Add Player

            </Button>

        </div>

    );

}