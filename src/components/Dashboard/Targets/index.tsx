import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { getWeek, parseDates } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTargets } from '@/store/dashboard/Actions';

interface TargetsProps {}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Targets: React.FC<TargetsProps> = ({}) => {
    const [week, setWeek] = useState(`${new Date().getFullYear()}-W${getWeek(new Date()) - 1}`);
    const [dates, setDates] = useState<[Date, Date]>();
    const [chartData, setChartData] = useState<ChartData<'pie'>>({
        labels: [],
        datasets: [],
    });
    const { targetCalories, targets, loading, errorMessage } = useAppSelector(
        (state) => state.dashboard
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        let newDates = parseDates(week);
        setDates([newDates[0], newDates[1]]);
        dispatch(getTargets(new Date(newDates[0].valueOf()), new Date(newDates[1].valueOf())));
    }, [week]);

    useEffect(() => {
        if (targetCalories && !loading) {
            setChartData({
                labels: targets,
                datasets: [
                    {
                        label: 'Targets',
                        data: targetCalories,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(178, 49, 129, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(178, 49, 129, 1)',
                        ],
                    },
                ],
            });
        }
    }, [targetCalories, loading]);

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Calories Burn on Body Parts from ${
                    dates ? dates[0].toLocaleDateString() : ''
                } to ${dates ? dates[1].toLocaleDateString() : ''}`,
                color: '#000',
            },
            tooltip: {
                mode: 'point',
                intersect: false,
            },
        },
    };

    return (
        <div className="chart-card">
            <input
                type="week"
                name="week"
                id="camp-week"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="h-10 p-2 rounded-md bg-primary-lighter"
            />
            <Pie options={options} data={chartData} className="max-h-96" height={240} />
        </div>
    );
};
