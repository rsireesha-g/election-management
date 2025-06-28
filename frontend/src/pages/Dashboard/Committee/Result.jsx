import { useEffect, useState } from 'react';
import { useGetVotersCountForCandidatesByElectionQuery } from '../../../redux/queries/candidates'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Loader } from '../../../components/Common/Loader';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export const Result = ({ resultsData, resultsLoading, activeElectionType }) => {
    const resultData = resultsData?.filter((data) => data?.election_type === activeElectionType);

    const candidateNames = resultData?.map((e) => e.candidate_name);
    const voteCounts = [10, 20, 10];

    const backgroundColors = voteCounts?.map(count =>
        count === Math.max(...voteCounts)
            ? 'rgba(99, 255, 104, 0.7)'  // Highlight color for max vote
            : 'rgba(75, 192, 192, 0.5)'  // Default bar color
    );
    const colors = voteCounts?.map(count =>
        count === Math.max(...voteCounts)
            ? 'rgba(255, 99, 132, 0.7)'  // Highlight color for max vote
            : 'rgba(75, 192, 192, 0.5)'  // Default bar color
    );

    const options = {
        responsive: true,
        // animation: {
        //     duration: 1000,
        //     easing: 'easeInCubic',
        // },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333',         // legend text color
                    font: {
                        size: 14,            // font size
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: `${activeElectionType} Chart`,
                color: '#111',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        scales: {
            // x: {
            //     color: (ctx) => {
            //         const label = ctx.tick.label;
            //         return label === maxCandidate ? '#d90429' : '#333';
            //     }
            // },
            y: {
                beginAtZero: true,
                min: 0,
                max: (Math.max(...voteCounts) + 20),
                ticks: {
                    stepSize: 1,
                    callback: value => `${value}`
                }
            }
        }
    };


    const labels = candidateNames;
    const data = {
        labels,
        datasets: [
            {
                label: 'Votes count',
                data: voteCounts,
                barThickness: 40,
                hoverBackgroundColor: 'rgba(0,0,0,0.3)',
                borderWidth: 1,
                backgroundColor: backgroundColors,
            }
        ],
    };


    console.log(resultData)

    return (
        <div style={{ width: '800px' }}>
            {resultsLoading ? <Loader size={'large'} />
                : <Bar
                    options={options}
                    data={data}
                />
            }
        </div>
    )
}
