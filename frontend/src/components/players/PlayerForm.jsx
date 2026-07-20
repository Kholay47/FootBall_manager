import { useState } from "react";

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
    const [formData, setFormData] = useState(
        () => initialValues || DEFAULT_PLAYER
    );

    const [errors, setErrors] = useState({});

    // ==========================================
    // Input Change
    // ==========================================

    function handleChange(e) {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "rank"
                      ? Number(value)
                      : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    // ==========================================
    // Validation
    // ==========================================

    function validate() {
        const validationErrors = {};

        const trimmedName = formData.name.trim();

        if (!trimmedName) {
            validationErrors.name = "Player name is required.";
        } else if (trimmedName.length < 2) {
            validationErrors.name =
                "Player name must contain at least 2 characters.";
        }

        if (!["Elite", "Good", "Average"].includes(formData.tier)) {
            validationErrors.tier =
                "Please select a valid tier.";
        }

        if (!Number.isInteger(formData.rank)) {
            validationErrors.rank =
                "Rank must be a whole number.";
        } else if (formData.rank < 1) {
            validationErrors.rank =
                "Rank must be greater than zero.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    }

    // ==========================================
    // Submit
    // ==========================================

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        await onSubmit({
            ...formData,
            name: formData.name.trim(),
        });
    }

    // ==========================================

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* Name */}

            <div>
                <label
                    htmlFor="player-name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                >
                    Player Name
                </label>

                <input
                    id="player-name"
                    name="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-400">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* Tier */}

            <div>
                <label
                    htmlFor="player-tier"
                    className="mb-2 block text-sm font-medium text-slate-300"
                >
                    Tier
                </label>

                <select
                    id="player-tier"
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                >
                    <option value="Elite">
                        Elite
                    </option>

                    <option value="Good">
                        Good
                    </option>

                    <option value="Average">
                        Average
                    </option>
                </select>

                {errors.tier && (
                    <p className="mt-1 text-sm text-red-400">
                        {errors.tier}
                    </p>
                )}
            </div>

            {/* Rank */}

            <div>
                <label
                    htmlFor="player-rank"
                    className="mb-2 block text-sm font-medium text-slate-300"
                >
                    Rank
                </label>

                <input
                    id="player-rank"
                    type="number"
                    name="rank"
                    min={1}
                    step={1}
                    value={formData.rank}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                />

                {errors.rank && (
                    <p className="mt-1 text-sm text-red-400">
                        {errors.rank}
                    </p>
                )}
            </div>

            {/* Availability */}

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    disabled={loading}
                />

                <span className="text-white">
                    Available
                </span>
            </label>

            {/* Submit */}

            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading
                    ? "Saving..."
                    : submitLabel}
            </Button>
        </form>
    );
}