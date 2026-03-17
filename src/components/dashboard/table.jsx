"use client";

import { memo } from "react";
import { List } from "react-window";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Row = memo(function Row({ index, style, rows }) {
  const row = rows[index];
  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div
      style={style}
      className="grid min-w-190 grid-cols-[1.3fr_1fr_1fr_1fr_.8fr_.8fr] items-center border-b border-slate-700 px-4 text-sm text-slate-200"
    >
      <span className="truncate text-slate-100">{row.product}</span>
      <span>{row.region}</span>
      <span>{row.category}</span>
      <span>{formatCurrency.format(row.revenue)}</span>
      <span>{row.orders}</span>
      <span>{row.conversionRate}%</span>
    </div>
  );
});

const VirtualizedTable = memo(function VirtualizedTable({
  rows,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) {
  const height = 440;
  const itemSize = 44;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="overflow-x-auto rounded-lg border border-slate-700/70">
          <div className="grid min-w-190 grid-cols-[1.3fr_1fr_1fr_1fr_.8fr_.8fr] bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
            <span>Product</span>
            <span>Region</span>
            <span>Category</span>
            <span>Revenue</span>
            <span>Orders</span>
            <span>Conv.</span>
          </div>
          <List
            rowComponent={Row}
            rowCount={rows.length}
            rowHeight={itemSize}
            rowProps={{ rows }}
            style={{ height }}
          />
        </div>

        <div className="mt-3 flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-300">
            Page <span className="font-semibold text-white">{currentPage}</span>{" "}
            <span className="text-slate-400">/</span>{" "}
            <span className="font-semibold text-white">{totalPages}</span>
          </p>
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPrevPage}
              disabled={currentPage === 1}
              className="gap-1"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onNextPage}
              disabled={currentPage === totalPages}
              className="gap-1"
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export { VirtualizedTable };
