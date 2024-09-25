'use client'
import { useRef, useState } from "react"
import { Input } from "./ui/input"
import { Pencil, Eye, EyeOff } from "lucide-react"
import { Button } from "./ui/button"

interface BalanceProp {
  name: string
}

export default function Balance(balance: BalanceProp) {
  const [money, setMoney] = useState('R$ 0')
  const inputRef = useRef<HTMLInputElement>(null)
  const [showMoney, setShowMoney] = useState(true)
  const [editMoney, setEditMoney] = useState(false)

  function onChangeMoney(value: string) {
    let cleanValue = value.replace(/\D/g, "");
    let formattedValue = (Number(cleanValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    setMoney(formattedValue);
  }

  function handleMoney() {
    setEditMoney(!editMoney);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="border bg-white/20 text-white p-4 rounded-lg w-52">
        <h1 className="font-bold">{balance.name}</h1>
        {editMoney ? (
          <div className="flex items-center">
            <Input
              className="font-bold"
              onSubmit={()=> null}
              value={money}
              onChange={(evt) => onChangeMoney(evt.target.value)}
              ref={inputRef}
              onKeyDown={(key) => {key.code == 'Enter' ? setEditMoney(false) : null}}
            />
          </div>
        ) : (
          showMoney ? (
            <div>
              <h1 className="text-2xl font-sans">{money.toString()}</h1>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold font-sans">***</h1>
            </div>
          )
        )}
        {null}
      </div>

      <div className="flex gap-2">
        <Button className="flex flex-1 h-full" onClick={handleMoney}>
          {editMoney ? <h1 className="font-bold">OK</h1> : <Pencil />}
        </Button>
        <Button className="flex flex-1 h-full" onClick={() => setShowMoney(!showMoney)}>
          {showMoney ? <Eye /> : <EyeOff />}
        </Button>
      </div>
    </div>
  )
}
