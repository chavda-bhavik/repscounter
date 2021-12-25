import React, { useEffect, useState } from 'react';
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
import { Bar } from 'react-chartjs-2';

import { MainContainer } from '@/components/MainContainer';
import { getWeek, parseDates } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store';
import { getCalories } from '@/store/dashboard/Actions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
    const [week, setWeek] = useState(`${new Date().getFullYear()}-W${getWeek(new Date()) - 1}`);
    const [dates, setDates] = useState<[Date, Date]>();
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        labels: [],
        datasets: [],
    });
    const { calories, loading, errorMessage } = useAppSelector((state) => state.dashboard);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let newDates = parseDates(week);
        setDates([newDates[0], newDates[1]]);
        dispatch(getCalories(new Date(newDates[0].valueOf()), new Date(newDates[1].valueOf())));
    }, [week]);

    useEffect(() => {
        if (calories && !loading) {
            setChartData({
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Calories',
                        data: calories,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            });
        }
    }, [calories, loading]);

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Calories Burns from ${dates ? dates[0].toLocaleDateString() : ''} to ${
                    dates ? dates[1].toLocaleDateString() : ''
                }`,
                color: '#000',
            },
            tooltip: {
                mode: 'point',
                intersect: false,
            },
        },
    };

    return (
        <MainContainer>
            <div className="container">
                <div className="grid space-x-2 p-2 grid-rows-2 md:grid-rows-none md:grid-cols-2">
                    <div className="bg-gray-50 p-2 w-full rounded-md">
                        <input
                            type="week"
                            name="week"
                            id="camp-week"
                            value={week}
                            onChange={(e) => setWeek(e.target.value)}
                            className="h-10 p-2 rounded-md bg-primary-lighter"
                        />
                        <Bar options={options} data={chartData} className="max-h-96" height={240} />
                    </div>
                    <div></div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Dashboard;
