import React from "react";

type Props = {
    title: string
}

function ChartCard({title}: Props) {
    return (
        <div className="block p-4 bg-white rounded-xl border border-border-grey">
            <h2>{title}</h2>
        </div>
    )
}
