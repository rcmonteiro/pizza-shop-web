import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import twColors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 1000 },
  { date: '12/12', revenue: 1400 },
  { date: '13/12', revenue: 900 },
  { date: '14/12', revenue: 1800 },
  { date: '15/12', revenue: 700 },
  { date: '16/12', revenue: 1100 },
]
export const RevenueChart = () => {
  return (
    <Card className="col-span-6">
      <CardHeader className="pb8 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <YAxis
              axisLine={false}
              width={80}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              width={80}
              tickLine={false}
              dy={16}
            />
            <CartesianGrid vertical={false} className=" stroke-muted" />
            <Line
              type="linear"
              stroke={twColors.violet[400]}
              strokeWidth={2}
              dataKey="revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
