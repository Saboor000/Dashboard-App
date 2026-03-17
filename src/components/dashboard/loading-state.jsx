import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LoadingState({ title }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-700" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-slate-700" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-slate-700" />
        </div>
      </CardContent>
    </Card>
  );
}
