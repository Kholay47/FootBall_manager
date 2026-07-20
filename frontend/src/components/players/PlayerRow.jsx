import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

import TierBadge from "./TierBadge";
import AvailabilityToggle from "./AvailabilityToggle";

export default function PlayerRow({

    player,

    onEdit,

    onDelete,

    onToggle,

}) {

    return (

        <tr className="border-b border-slate-800 hover:bg-slate-800/40">

            <td className="px-6 py-4 font-medium text-white">
                {player.name}
            </td>

            <td className="px-6 py-4">

                <TierBadge
                    tier={player.tier}
                />

            </td>

            <td className="px-6 py-4 text-center text-white">

                {player.rank}

            </td>

            <td className="px-6 py-4">

                <AvailabilityToggle
                    checked={player.available}
                    onChange={onToggle}
                />

            </td>

            <td className="px-6 py-4">

                <div className="flex gap-4">

                    <button
                        onClick={onEdit}
                        className="text-sky-400 transition hover:text-sky-300"
                    >
                        <FaEdit />
                    </button>

                    <button
                        onClick={onDelete}
                        className="text-red-400 transition hover:text-red-300"
                    >
                        <FaTrash />
                    </button>

                </div>

            </td>

        </tr>

    );

}