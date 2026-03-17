"use client";

import { memo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RevenueLineChart = memo(function RevenueLineChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-64 p-3 pt-0 sm:h-80 sm:p-5 sm:pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#cbd5e1" }}
              interval="preserveStartEnd"
              minTickGap={28}
              tickMargin={6}
            />
            <YAxis tick={{ fontSize: 12, fill: "#cbd5e1" }} width={44} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#334155",
                backgroundColor: "#0f172a",
                color: "#e2e8f0",
              }}
              formatter={(value) => [
                new Intl.NumberFormat("en-US").format(value),
                "Revenue",
              ]}
            />
            <Legend wrapperStyle={{ paddingTop: 8 }} />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#0f766e"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={450}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

export { RevenueLineChart };
