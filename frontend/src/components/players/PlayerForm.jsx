import { useEffect, useState } from "react";

import Button from "../common/Button";

const DEFAULT_PLAYER = {
    name: "",
    tier: "Average",
    rank: 1,
    available: true,
};

export default function PlayerForm({
    initialValues = DEFAULT_PLAYER,
    onSubmit,
    loading = false,
    submitLabel = "Save Player",
}) {
    const [formData, setFormData] = useState(DEFAULT_PLAYER);

    useEffect(() => {
        setFormData(initialValues || DEFAULT_PLAYER);
    }, [initialValues]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "rank"
                    ? Number(value)
                    : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                    Player Name
                </label>

                <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                    Tier
                </label>

                <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                >
                    <option value="Elite">Elite</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                </select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                    Rank
                </label>

                <input
                    required
                    min={1}
                    type="number"
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                />
            </div>

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                />

                <span className="text-white">
                    Available
                </span>
            </label>

            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? "Saving..." : submitLabel}
            </Button>
        </form>
    );
}