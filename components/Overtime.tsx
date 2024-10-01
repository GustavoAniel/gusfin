'use client'
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { onChangeMoney } from "@/lib/utils";

export default function Overtime() {
  const [money, setMoney] = useState('R$ 0')

  function changeMoney(value: string) {
    setMoney(onChangeMoney(value));
  }
  
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-center">
          Cálculo de hora extra
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <span>Qual é o seu salário base?</span>
          <Input
              className="font-bold"
              onSubmit={()=> null}
              value={money}
              onChange={(evt) => changeMoney(evt.target.value)}
            />
        </div>

        <div>
          <span>Quantas horas você realmente fez?</span>
          <Input type="number" className="w-32" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col">
        <p className="font-bold">Total: {money} </p>
      </CardFooter>
    </Card>
  )
}