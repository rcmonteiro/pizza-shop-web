import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import twColors from 'tailwindcss/colors'

import { getRevenueByPeriod } from '@/api/get-revenue-by-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
export const RevenueChart = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: revenueByPeriod } = useQuery({
    queryKey: ['metrics', 'revenue-by-period', dateRange],
    queryFn: () =>
      getRevenueByPeriod({ from: dateRange?.from, to: dateRange?.to }),
    staleTime: 2000,
  })

  const cardData = useMemo(() => {
    return revenueByPeriod?.map((item) => {
      return {
        date: item.date,
        receipt: item.receipt / 100,
      }
    })
  }, [revenueByPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="pb8 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {cardData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={cardData} style={{ fontSize: 12 }}>
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
                dataKey="receipt"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[248px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
