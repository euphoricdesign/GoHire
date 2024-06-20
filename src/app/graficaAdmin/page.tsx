"use client";
import { NextPage } from 'next';
import GraficaAdmin from '@/components/GraficaAdmin/GraficaAdmin';
import { useGetStatisticsQuery } from '@/lib/services/statisticsApi';
import { useEffect, useState } from 'react';
import { StatisticsData } from '@/types/statisticsTypes';

const GraficaPage: NextPage = () => {
  const { data, error, isLoading } = useGetStatisticsQuery(null);
  const [earningsData, setEarningsData] = useState<number[]>([]);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    if (data) {
      // Crear un objeto para almacenar los valores de earnings por mes
      const earningsMap: { [key: string]: number } = {};
      data.forEach((item: StatisticsData) => {
        earningsMap[item.month] = item.totalValue;
      });

      // Mapear los datos de earnings en el orden de los meses
      const formattedData = labels.map((month) => earningsMap[month] || 0);
      setEarningsData(formattedData);
    }
  }, [data]);

  if (isLoading) return (
    <div className="w-full flex flex-row gap-2 justify-center items-center mt-[200px] mb-[60px]">
      <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#3C65F5] animate-bounce [animation-delay:-.5s]"></div>
    </div>
  )
  if (error) {
    console.error("Error fetching statistics:", error); // Depuración: verificar el error
    return <div className='mt-[150px] mb-[390px] text-lg text-center'>Error loading data</div>;
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
