'use client'
import { DollarSign, Eye, EyeOff, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Balance from "./Balance";

export default function Sidebar() {
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
    <main className="flex flex-col gap-2 p-3 border-r">

      <Balance name="Saldo" />
      <Balance name="Fatura" />
    </main>
  )
}