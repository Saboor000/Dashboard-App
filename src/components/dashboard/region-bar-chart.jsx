"use client";

import { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegionBarChart = memo(function RegionBarChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders by Region</CardTitle>
      </CardHeader>
      <CardContent className="h-64 p-3 pt-0 sm:h-80 sm:p-5 sm:pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
            <XAxis
              dataKey="region"
              tick={{ fontSize: 12, fill: "#cbd5e1" }}
              interval="preserveStartEnd"
              minTickGap={18}
              tickMargin={6}
            />
            <YAxis tick={{ fontSize: 12, fill: "#cbd5e1" }} width={36} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#334155",
                backgroundColor: "#0f172a",
                color: "#e2e8f0",
              }}
              formatter={(value) => [
                new Intl.NumberFormat("en-US").format(value),
                "Orders",
              ]}
            />
            <Legend wrapperStyle={{ paddingTop: 8 }} />
            <Bar
              dataKey="orders"
              name="Orders"
              fill="#0369a1"
              radius={[8, 8, 0, 0]}
              maxBarSize={44}
              isAnimationActive
              animationDuration={450}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

export { RegionBarChart };
