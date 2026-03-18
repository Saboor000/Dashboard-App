"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ErrorState } from "@/components/dashboard/error-state";
import { FiltersPanel } from "@/components/dashboard/filters-panel";
import { LoadingState } from "@/components/dashboard/loading-state";
import { RegionBarChart } from "@/components/dashboard/region-bar-chart";
import { RevenueLineChart } from "@/components/dashboard/revenue-line-chart";
import { VirtualizedTable } from "@/components/dashboard/table";
import { useDebounce } from "@/hooks/use-debounce";
import { useDashboardData } from "@/hooks/use-dashboard-data";

const PAGE_SIZE = 8;

function getUnique(records, key) {
  return [...new Set(records.map((item) => item[key]))];
}

const KpiCards = memo(function KpiCards({ records, updatedAt }) {
  const totals = useMemo(() => {
    const revenue = records.reduce((sum, item) => sum + item.revenue, 0);
    const orders = records.reduce((sum, item) => sum + item.orders, 0);
    const users = records.reduce((sum, item) => sum + item.users, 0);
    const avgConversion = records.length
      ? records.reduce((sum, item) => sum + item.conversionRate, 0) /
        records.length
      : 0;

    return {
      revenue,
      orders,
      users,
      avgConversion,
    };
  }, [records]);

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const compact = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        notation: "compact",
      }),
    [],
  );

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-300">
            Revenue
          </p>
          <p className="text-2xl font-semibold text-white">
            {money.format(totals.revenue)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-300">
            Orders
          </p>
          <p className="text-2xl font-semibold text-white">
            {compact.format(totals.orders)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-300">
            Users
          </p>
          <p className="text-2xl font-semibold text-white">
            {compact.format(totals.users)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-300">
            Avg Conversion
          </p>
          <p className="text-2xl font-semibold text-white">
            {totals.avgConversion.toFixed(2)}%
          </p>
          <Badge className="bg-emerald-300 text-emerald-950">
            Updated: {updatedAt}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
});

export function Dashboard() {
  const { records, updatedAt, loading, error, refetch } = useDashboardData();
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchText = useDebounce(searchText, 300);

  const regionOptions = useMemo(() => getUnique(records, "region"), [records]);
  const categoryOptions = useMemo(
    () => getUnique(records, "category"),
    [records],
  );

  const toggleInList = useCallback((value, setter) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }, []);

  const handleToggleRegion = useCallback(
    (region) => {
      setCurrentPage(1);
      toggleInList(region, setSelectedRegions);
    },
    [toggleInList],
  );

  const handleToggleCategory = useCallback(
    (category) => {
      setCurrentPage(1);
      toggleInList(category, setSelectedCategories);
    },
    [toggleInList],
  );

  const handleSearchText = useCallback((value) => {
    setCurrentPage(1);
    setSearchText(value);
  }, []);

  const filteredRecords = useMemo(() => {
    const query = debouncedSearchText.trim().toLowerCase();
    return records.filter((item) => {
      const regionPass =
        selectedRegions.length === 0 || selectedRegions.includes(item.region);
      const categoryPass =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);
      const searchPass =
        query.length === 0 || item.product.toLowerCase().includes(query);

      return regionPass && categoryPass && searchPass;
    });
  }, [records, selectedRegions, selectedCategories, debouncedSearchText]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE)),
    [filteredRecords.length],
  );

  const visiblePage = Math.min(currentPage, totalPages);

  const paginatedRecords = useMemo(() => {
    const start = (visiblePage - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, visiblePage]);

  const revenueTrendData = useMemo(() => {
    const grouped = new Map();

    filteredRecords.forEach((item) => {
      const label = new Date(item.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const current = grouped.get(label) ?? 0;
      grouped.set(label, current + item.revenue);
    });

    return [...grouped.entries()]
      .slice(0, 12)
      .map(([label, revenue]) => ({ label, revenue }));
  }, [filteredRecords]);

  const regionOrdersData = useMemo(() => {
    const grouped = new Map();

    filteredRecords.forEach((item) => {
      const current = grouped.get(item.region) ?? 0;
      grouped.set(item.region, current + item.orders);
    });

    return [...grouped.entries()].map(([region, orders]) => ({
      region,
      orders,
    }));
  }, [filteredRecords]);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl space-y-6 p-6">
        <LoadingState title="Loading dashboard data" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl space-y-6 p-6">
        <ErrorState
          title="Data source unavailable"
          description={error}
          onRetry={refetch}
        />
      </main>
    );
  }

  if (records.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl space-y-6 p-6">
        <EmptyState
          title="No records found"
          description="The API returned an empty dataset. Try again in a few moments."
        />
      </main>
    );
  }

  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleTimeString()
    : "-";

  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-6 p-6">
      <section className="animate-[fade-in_.55s_ease-out]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">
          Live Operations Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-sky-50">
          Revenue Pulse
        </h1>
      </section>

      <section className="animate-[slide-up_.6s_ease-out]">
        <KpiCards records={filteredRecords} updatedAt={updatedLabel} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FiltersPanel
          regionOptions={regionOptions}
          categoryOptions={categoryOptions}
          selectedRegions={selectedRegions}
          selectedCategories={selectedCategories}
          searchText={searchText}
          onToggleRegion={handleToggleRegion}
          onToggleCategory={handleToggleCategory}
          onSearchTextChange={handleSearchText}
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {revenueTrendData.length > 0 ? (
            <RevenueLineChart data={revenueTrendData} />
          ) : (
            <EmptyState
              title="Revenue chart unavailable"
              description="No data currently matches the selected filters."
            />
          )}

          {regionOrdersData.length > 0 ? (
            <RegionBarChart data={regionOrdersData} />
          ) : (
            <EmptyState
              title="Orders chart unavailable"
              description="No regional data currently matches the selected filters."
            />
          )}
        </div>
      </section>

      <section>
        {filteredRecords.length > 0 ? (
          <VirtualizedTable
            rows={paginatedRecords}
            currentPage={visiblePage}
            totalPages={totalPages}
            onPrevPage={() =>
              setCurrentPage((page) =>
                Math.max(1, Math.min(page, totalPages) - 1),
              )
            }
            onNextPage={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, Math.min(page, totalPages) + 1),
              )
            }
          />
        ) : (
          <EmptyState
            title="Table has no rows"
            description="Try adjusting the search and multi-select filters."
          />
        )}
      </section>
    </main>
  );
}
