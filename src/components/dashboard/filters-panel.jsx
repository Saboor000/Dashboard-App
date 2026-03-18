"use client";

import { memo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

const FiltersPanel = memo(function FiltersPanel({
  regionOptions,
  categoryOptions,
  selectedRegions,
  selectedCategories,
  searchText,
  onToggleRegion,
  onToggleCategory,
  onSearchTextChange,
}) {
  const [localSearchText, setLocalSearchText] = useState(searchText);
  const debouncedSearchText = useDebounce(localSearchText, 300);

  useEffect(() => {
    onSearchTextChange(debouncedSearchText);
  }, [debouncedSearchText, onSearchTextChange]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Search product
          </p>
          <Input
            value={localSearchText}
            onChange={(e) => setLocalSearchText(e.target.value)}
            placeholder="Type to filter products..."
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Regions
          </p>
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((region) => {
              const active = selectedRegions.includes(region);
              return (
                <button
                  type="button"
                  key={region}
                  onClick={() => onToggleRegion(region)}
                  className="rounded-full"
                >
                  <Badge
                    className={
                      active
                        ? "bg-sky-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }
                  >
                    {region}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => {
              const active = selectedCategories.includes(category);
              return (
                <button
                  type="button"
                  key={category}
                  onClick={() => onToggleCategory(category)}
                  className="rounded-full"
                >
                  <Badge
                    className={
                      active
                        ? "bg-amber-500 text-black"
                        : "bg-slate-800 text-amber-200"
                    }
                  >
                    {category}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export { FiltersPanel };
