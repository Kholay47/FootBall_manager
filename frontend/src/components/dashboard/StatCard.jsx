import Card from "../common/Card";

export default function StatCard({
    title,
    value,
    icon,
    color = "emerald",
    subtitle,
}) {
    const colorClasses = {
        emerald: {
            iconBg: "bg-emerald-500/15",
            iconText: "text-emerald-400",
            valueText: "text-emerald-400",
        },
        blue: {
            iconBg: "bg-sky-500/15",
            iconText: "text-sky-400",
            valueText: "text-sky-400",
        },
        amber: {
            iconBg: "bg-amber-500/15",
            iconText: "text-amber-400",
            valueText: "text-amber-400",
        },
        red: {
            iconBg: "bg-red-500/15",
            iconText: "text-red-400",
            valueText: "text-red-400",
        },
        purple: {
            iconBg: "bg-purple-500/15",
            iconText: "text-purple-400",
            valueText: "text-purple-400",
        },
    };

    const styles = colorClasses[color];

    return (
        <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-400">
                        {title}
                    </p>

                    <h2
                        className={`mt-3 text-4xl font-bold ${styles.valueText}`}
                    >
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-3 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-xl
                        ${styles.iconBg}
                    `}
                >
                    <div className={styles.iconText}>
                        {icon}
                    </div>
                </div>

            </div>

        </Card>
    );
}
