'use client'

import React from "react";
import Carousel from "../components/Carousel/Carousel";
import Home from "@/components/Home/Home";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {increment, decrement} from "@/lib/features/counter/counterSlice"

export default function MainPage() {

 const count = useAppSelector(state => state.counterReducer.value)
const dispatch = useAppDispatch()

  return (
    <div className="relative">
      <Home />
      <div className="px-[124px]">
        <Carousel />
      </div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Incrementar</button>
    </div>
  );
}