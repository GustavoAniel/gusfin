'use client'
import { useState } from "react";
import LeftSalary from "./LeftSalary";
import LeftVA from "./LeftVA";

interface CalcTotalProp{
  
}

export default function HomeFin() {
  const [calcTotal, setCalcTotal] = useState()

  return (
    <div className="flex flex-col flex-1 min-h-screen">

      <div className="flex-1 flex p-3 gap-3">
       <LeftSalary />
       <LeftVA />
      </div>
    </div>
  )
}