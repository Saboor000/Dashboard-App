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
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 8, left: 4, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
            <XAxis dataKey="region" tick={{ fontSize: 12, fill: "#cbd5e1" }} />
            <YAxis tick={{ fontSize: 12, fill: "#cbd5e1" }} />
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
            <Legend />
            <Bar
              dataKey="orders"
              name="Orders"
              fill="#0369a1"
              radius={[8, 8, 0, 0]}
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
