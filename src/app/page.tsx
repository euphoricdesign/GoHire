'use client'

// src/app/page.tsx
import React from "react";
import Carousel from "../components/Carousel/Carousel";
import Home from "@/components/Home/Home";
import RootLayout from "./layout";
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function MainPage() {
  return (
    <Provider store={store}>
      <RootLayout>
        <div className="relative">
          <Home />
          <div className="px-[124px]">
            <Carousel />
          </div>
        </div>
      </RootLayout>
    </Provider>
  );
}

