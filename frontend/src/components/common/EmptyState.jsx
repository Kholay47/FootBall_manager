import { FaUsersSlash } from "react-icons/fa";

export default function EmptyState({
    title = "No Data",
    description = "Nothing to display.",
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16">

            <FaUsersSlash
                size={60}
                className="text-slate-500"
            />

            <h2 className="text-2xl font-bold text-white">
                {title}
            </h2>

            <p className="text-slate-400">
                {description}
            </p>

        </div>
    );
}