'use client'

import React from "react";
import Carousel from "../components/Carousel/Carousel";
import Home from "@/components/Home/Home";

export default function MainPage() {
  return (
    <div className="relative">
      <Home />
      <Carousel />
    </div>
  );
}
