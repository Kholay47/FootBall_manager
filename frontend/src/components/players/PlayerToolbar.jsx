import { FaPlus, FaSearch } from "react-icons/fa";
import Button from "../common/Button";

export default function PlayerToolbar({

    search,

    setSearch,

    onAdd,

}) {

    return (

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="relative">

                <FaSearch
                    className="absolute left-4 top-3.5 text-slate-400"
                />

                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="Search players..."
                    className="
                        w-80
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-900
                        py-3
                        pl-11
                        pr-4
                        text-white
                        outline-none
                        focus:border-emerald-500
                    "
                />

            </div>

            <Button onClick={onAdd}>

                <FaPlus />

                Add Player

            </Button>

        </div>

    );

}