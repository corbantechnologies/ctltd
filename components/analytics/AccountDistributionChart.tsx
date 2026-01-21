/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface AccountDistributionChartProps {
  data: any[]; // Expecting COAs with books
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AccountDistributionChart({
  data,
}: AccountDistributionChartProps) {
  const chartData: ChartData[] = data
    .map((coa) => ({
      name: coa.name,
      value: coa.books?.length || 0,
    }))
    .filter((item) => item.value > 0);

  return (
    <Card className="col-span-1 shadow-xl shadow-black/5 border-none rounded-[32px] bg-white/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-black">
          Books Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
