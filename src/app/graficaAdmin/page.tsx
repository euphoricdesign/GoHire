// pages/grafica.tsx

import { NextPage } from 'next';
import GraficaAdmin from '@/components/GraficaAdmin/GraficaAdmin';

const GraficaPage: NextPage = () => {
  const earningsData = [2000, 3000, 4500, 6000, 7500, 1500, 9000, 10000, 7000, 9500, 10500, 9000];
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="bg-gray-100 min-h-screen pt-20"> {/* Ajuste aquí */}
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
