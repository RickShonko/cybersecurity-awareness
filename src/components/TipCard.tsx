import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Shield } from "lucide-react";
import { format } from "date-fns";

interface TipCardProps {
  title: string;
  content: string;
  datePosted: string;
  featured?: boolean;
}

const TipCard = ({ title, content, datePosted, featured = false }: TipCardProps) => {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${
        featured ? "border-primary shadow-glow" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {format(new Date(datePosted), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
          {featured && (
            <Badge variant="default" className="bg-gradient-primary">
              Today
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
};

export default TipCard;
