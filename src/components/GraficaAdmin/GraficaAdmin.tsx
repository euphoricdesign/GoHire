// components/GraficaAdmin.tsx
"use client"
import { FC } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraficaAdminProps {
  data: number[];
  labels: string[];
}

const GraficaAdmin: FC<GraficaAdminProps> = ({ data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Earnings',
        data,
        backgroundColor: '#0f0bf7',
        borderColor: '#0f0bf7',
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default GraficaAdmin;
