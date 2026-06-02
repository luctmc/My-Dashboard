import { ExternalLink } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config/app.config";

export function AboutView() {
  return (
    <div className="grid gap-6">
      <SectionHeader
        title="About"
        description="Project identity, author information and the foundation for future phases."
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>{appConfig.name}</CardTitle>
            <CardDescription>{appConfig.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-md border bg-muted/35 p-4">
              <p className="text-sm text-muted-foreground">Developed by</p>
              <p className="mt-1 text-lg font-semibold">{appConfig.author}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Initial version</p>
              <Badge variant="success">Version {appConfig.version}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurable links</CardTitle>
            <CardDescription>Placeholders are easy to replace in the app config file.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {Object.entries(appConfig.socials).map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-md border bg-background/55 p-3 text-sm capitalize transition hover:bg-muted"
              >
                {label}
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Technologies</CardTitle>
          <CardDescription>The first version keeps the stack modern and ready to evolve.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {appConfig.technologies.map((technology) => (
            <Badge key={technology} variant="secondary">
              {technology}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
