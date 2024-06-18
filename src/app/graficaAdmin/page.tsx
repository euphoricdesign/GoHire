// pages/grafica.tsx

import { NextPage } from 'next';
import GraficaAdmin from '@/components/GraficaAdmin/GraficaAdmin';

const GraficaPage: NextPage = () => {
  const earningsData = [2000, 3000, 4500, 6000, 7500, 1500, 9000, 10000, 7000, 9500, 10500, 9000];
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Monthly Earnings</h1>
        <GraficaAdmin data={earningsData} labels={labels} />
      </div>
    </div>
  );
};

export default GraficaPage;
