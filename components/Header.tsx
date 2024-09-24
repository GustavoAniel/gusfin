'use client'
import { DollarSign, Eye, EyeOff, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Balance from "./Balance";

export default function Header() {
  const [money, setMoney] = useState('R$ 0')
  const [showMoney, setShowMoney] = useState(true)
  const [editMoney, setEditMoney] = useState(false)

  function onEditMoney(value: string) {
    // Remove tudo que não for número
    let cleanValue = value.replace(/\D/g, "");

    // Transforma o valor em número e divide por 100 para simular casas decimais
    let formattedValue = (Number(cleanValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    setMoney(formattedValue);
  }

  return (
    <div className="flex flex-col gap-2 w-full justify-between ">
      <div className="flex flex-col gap-2">
        <div className="border bg-emerald-500 text-white p-4 rounded-lg w-52">
          <h1 className="font-bold">Saldo</h1>
          {editMoney ?
            <div className="flex items-center">
              <Input className="font-bold" value={money} onChange={(evt) => { onEditMoney(evt.target.value) }} />
            </div>
            :
            showMoney ?
              <div>
                <h1 className="text-2xl font-sans">{money.toString()}</h1>
              </div>
              :
              <div>
                <h1 className="text-2xl font-bold font-sans">***</h1>
              </div>
          }
          {null}
        </div>

        <div className="flex gap-2">
          <Button className="flex flex-1 h-full" onClick={() => setEditMoney(!editMoney)}>
            {editMoney ? <h1 className="font-bold">OK</h1> : <Pencil />}
          </Button>
          <Button className="flex flex-1 h-full" onClick={() => { setShowMoney(!showMoney) }}>
            {showMoney ? <Eye /> : <EyeOff />}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="border bg-red-500 text-white p-4 rounded-lg w-52">
          <h1 className="font-bold">Fatura</h1>
          {editMoney ?
            <div className="flex items-center">
              <Input className="font-bold" value={money} onChange={(evt) => { onEditMoney(evt.target.value) }} />
            </div>
            :
            showMoney ?
              <div>
                <h1 className="text-2xl font-sans">{money.toString()}</h1>
              </div>
              :
              <div>
                <h1 className="text-2xl font-bold">***</h1>
              </div>
          }
          {null}
        </div>

        <div className="flex gap-2">
          <Button className="flex flex-1 h-full" onClick={() => setEditMoney(!editMoney)}>
            {editMoney ? <h1 className="font-bold">OK</h1> : <Pencil />}
          </Button>
          <Button className="flex flex-1 h-full" onClick={() => { setShowMoney(!showMoney) }}>
            {showMoney ? <Eye /> : <EyeOff />}
          </Button>
        </div>
      </div>

      <Balance name="Saldo" />
    </div>
  )
}