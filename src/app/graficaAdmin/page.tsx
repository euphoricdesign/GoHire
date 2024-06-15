// pages/grafica.tsx

import { NextPage } from 'next';
import GraficaAdmin from '@/components/GraficaAdmin/GraficaAdmin';

const GraficaPage: NextPage = () => {
  const earningsData = [5000, 7000, 8000, 6000, 7500, 8500, 9000, 9500, 7000, 8000, 8500, 9000];
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Ganancias Mensuales</h1>
        <GraficaAdmin data={earningsData} labels={labels} />
      </div>
    </div>
  );
};

export default GraficaPage;
