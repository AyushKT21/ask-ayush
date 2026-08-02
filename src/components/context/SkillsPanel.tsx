import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { SKILL_CATEGORIES } from "@/constants/portfolio";

import { PanelHeading } from "./PanelHeading";
import { TechStackGrid } from "./TechStackGrid";

export function SkillsPanel() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <PanelHeading title="Core stack" />
        <TechStackGrid />
      </section>

      <section className="space-y-4">
        <PanelHeading title="Skills by area" />

        <div className="space-y-4">
          {SKILL_CATEGORIES.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{category.label}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
