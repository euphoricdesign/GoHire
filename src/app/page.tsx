import React, { Suspense } from "react";
import Home from "@/components/Home/Home";

// Componentes separados
const Categories = React.lazy(() => import('../components/Categories/Categories'));
const SpotlightListings = React.lazy(() => import('../components/SpotlightListings/SpotlightListings'));
const AdSection = React.lazy(() => import('../components/AdSection/AdSection'));


export default function MainPage() {
  return (
    <div className="relative">
      <Home />
      <div className="xl:px-[124px] md:px-[60px] mobile:px-[30px] mt-[100px]">
          {/* Componentes cargados parcialmente */}
          <Suspense fallback={<div>Cargando categorías...</div>}>
            <Categories />
          </Suspense>

          <Suspense fallback={<div>Cargando anuncio...</div>}>
            <AdSection />
          </Suspense>

          <Suspense fallback={<div>Cargando últimos empleos...</div>}>
            <SpotlightListings />
          </Suspense>
      </div>
    </div>
  );
}