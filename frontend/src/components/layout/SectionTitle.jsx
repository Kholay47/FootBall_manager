export default function SectionTitle({
    title,
    subtitle,
    action,
}) {
    return (
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div>

                <h2 className="text-3xl font-bold text-white">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-2 text-slate-400">
                        {subtitle}
                    </p>
                )}

            </div>

            {action && (
                <div>
                    {action}
                </div>
            )}

        </div>
    );
}