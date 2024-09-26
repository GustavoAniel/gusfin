import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { Calendar } from "./ui/calendar";

const chartData = [
  { browser: "safari", visitor: 200, fill: "var(--color-safari)" },
]
const chartConfig = {
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function getLastBusinessDay(year: number, month: number): Date {
  // Pega o último dia do mês
  let lastDayOfMonth = new Date(year, month + 1, 0); // Dia 0 do próximo mês é o último dia do mês atual

  // Se o último dia for domingo, volta para sexta-feira
  if (lastDayOfMonth.getDay() === 0) { // Domingo
    lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 2); // Sexta-feira anterior
  } else if (lastDayOfMonth.getDay() === 6) { // Sábado
    lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1); // Sexta-feira anterior
  }

  return lastDayOfMonth;
}
function daySalary() {
  const today = new Date();
  const lastBusinessDay = getLastBusinessDay(today.getFullYear(), today.getMonth());

  return lastBusinessDay;
}

function daysUntilSalary() {
  const today = new Date();
  const lastBusinessDay = daySalary();

  const diffInMilliseconds = lastBusinessDay.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return diffInDays;
}

const daysLeft = daysUntilSalary();
const daySalaryLeft = `${daySalary().getDate().toString().padStart(2, '0')}/${(
  daySalary().getMonth() + 1
).toString().padStart(2, '0')}/${daySalary().getFullYear().toString()}`;

export default function LeftVA() {
  return (
    <Card className="flex h-fit flex-col p-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Dias para o vale</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
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
            <RadialBar dataKey="visitor" background cornerRadius={10} />
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
                          {daysLeft === 0 ? 'Hoje' : daysLeft}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {daysLeft === 0 ? null : 'Dias'}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <Calendar
          selected={daySalary()}
          fromMonth={new Date(daySalary().getFullYear(), daySalary().getMonth() - 1)}
          toMonth={new Date(daySalary().getFullYear(), daySalary().getMonth())}
          classNames={{
            day_selected: `bg-emerald-500 border-amber-500 text-white`,
            day_today: `bg-blue-500/30 border-amber-500 text-white`,
            button: `bg-slate-300`
          }} />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Último dia útil do mês
        </div>
        <div className="leading-none text-muted-foreground">
          {daySalaryLeft}
        </div>
      </CardFooter>
    </Card>
  );
}
