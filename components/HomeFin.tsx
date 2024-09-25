'use client'
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer } from "./ui/chart";

export const description = "A radial chart with text"
const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


function getNextFifthBusinessDay(year: number, month: number): Date {
  let currentDate = new Date(year, month, 1);
  let businessDaysCount = 0;
  let fifthBusinessDay =  new Date();

  // Percorre os dias do mês até encontrar o 5º dia útil
  while (businessDaysCount < 5) {
      // Se for um dia útil (segunda a sábado), contamos
      if (currentDate.getDay() !== 0) { // Ignora domingos
          businessDaysCount++;
      }

      // Quando atingir o 5º dia útil, salva a data
      if (businessDaysCount === 5) {
          fifthBusinessDay = new Date(currentDate);
      }

      // Avança para o próximo dia até encontrar o 5º dia útil
      currentDate.setDate(currentDate.getDate() + 1);
  }

  // Verifica se o 5º dia útil é um sábado e ajusta para sexta-feira anterior
  if (fifthBusinessDay?.getDay() === 6) { // Sábado
      fifthBusinessDay.setDate(fifthBusinessDay.getDate() - 1); // Ajusta para sexta-feira
    }
    return fifthBusinessDay;

}

function daysUntilSalary() {
  const today = new Date(); // Data atual
  const nextFifthBusinessDay = getNextFifthBusinessDay(today.getFullYear(), today.getMonth());

  // Calcula a diferença em milissegundos e converte para dias
  const diffInMilliseconds = nextFifthBusinessDay.getTime() - today.getTime();
  const diffInDays = (Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)) * -1);

  return diffInDays;
}

// Exemplo de uso:
const daysLeft = daysUntilSalary();
console.log(`Faltam ${daysLeft} dias para o salário.`);

export default function HomeFin() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      
      <div className="flex-1 flex p-3 gap-5">
        <Card className="flex h-fit flex-col p-2">
          <CardHeader className="items-center pb-0">
            <CardTitle>Dias para o salário </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={360 - (daysLeft * 10)}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-white"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="visitors" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {daysLeft.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Dias
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Cálculo com base no próximo 5º dia útil
            </div>
          </CardFooter>
        </Card>

        
      </div>
    </div>
  )
}