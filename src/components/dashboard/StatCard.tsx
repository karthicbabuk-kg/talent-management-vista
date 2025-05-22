
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon,
  change, 
  className 
}) => {
  return (
    <Card className={cn("dashboard-card", className)}>
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {change && (
              <p className={`text-xs mt-2 flex items-center ${
                change.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.positive ? '↑' : '↓'} {change.value}
              </p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
