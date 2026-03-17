import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ErrorState({ title, description, onRetry }) {
  return (
    <Card className="border-rose-800/60 bg-rose-950/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-rose-300">
          <AlertTriangle className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-rose-200/90">{description}</p>
        <Button variant="outline" onClick={onRetry}>
          Retry Fetch
        </Button>
      </CardContent>
    </Card>
  );
}
