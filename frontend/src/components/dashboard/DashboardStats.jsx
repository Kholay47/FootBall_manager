import {
    FaUsers,
    FaUserCheck,
    FaCrown,
    FaShieldAlt,
    FaUser,
} from "react-icons/fa";

import StatCard from "./StatCard";

export default function DashboardStats({

    stats,

}) {

    return (

        <section className="mb-10">

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

                <StatCard
                    title="Total Players"
                    value={stats.total}
                    subtitle="Registered"
                    icon={<FaUsers size={26} />}
                    color="blue"
                />

                <StatCard
                    title="Available"
                    value={stats.available}
                    subtitle="Ready to Play"
                    icon={<FaUserCheck size={26} />}
                    color="emerald"
                />

                <StatCard
                    title="Elite"
                    value={stats.elite}
                    subtitle="Top Players"
                    icon={<FaCrown size={26} />}
                    color="red"
                />

                <StatCard
                    title="Good"
                    value={stats.good}
                    subtitle="Solid Players"
                    icon={<FaShieldAlt size={26} />}
                    color="purple"
                />

                <StatCard
                    title="Average"
                    value={stats.average}
                    subtitle="Developing"
                    icon={<FaUser size={26} />}
                    color="amber"
                />

            </div>

        </section>

    );

}