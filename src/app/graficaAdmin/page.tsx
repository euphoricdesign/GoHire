"use client";
import { NextPage } from 'next';
import GraficaAdmin from '@/components/GraficaAdmin/GraficaAdmin';
import { useGetStatisticsQuery } from '@/lib/services/statisticsApi';
import { useEffect, useState } from 'react';
import { StatisticsData } from '@/types/statisticsTypes';

const GraficaPage: NextPage = () => {
  const { data: statisticsData, error, isLoading } = useGetStatisticsQuery(null);
  const [earningsData, setEarningsData] = useState<number[]>([]);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    if (statisticsData) {
      // Crear un objeto para almacenar los valores de earnings por mes
      const earningsMap: { [key: string]: number } = {};
      statisticsData.forEach((item: StatisticsData) => {
        earningsMap[item.month] = item.totalValue;
      });

      // Mapear los datos de earnings en el orden de los meses
      const formattedData = labels.map((month) => earningsMap[month] || 0);
      setEarningsData(formattedData);
    }
  }, [statisticsData, labels]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching statistics:", error); // Depuración: verificar el error
    return <div>Error loading data</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <h2 className="text-2xl font-bold my-4 mx-6">Monthly Earnings</h2>
      <div className="grid grid-cols-1 m-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <GraficaAdmin data={earningsData} labels={labels} />
        </div>
      </div>
    </div>
  );
};

export default GraficaPage;
